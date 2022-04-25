import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignOptions, TokenExpiredError } from 'jsonwebtoken'
import { RefreshToken } from './refresh-token.entity'
import { RefreshTokensRepository } from './refresh-token.repository'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import * as config from 'config';
const jwtConfig = config.get('jwt');

const BASE_OPTIONS: SignOptions = {
    issuer: 'https://my-app.com',
    audience:'https://my-app.com',
  }
  
  export interface RefreshTokenPayload {
    jti: number;
    sub: number
  }
  
  @Injectable()
  export class TokensService {
    private readonly tokens: RefreshTokensRepository
    private readonly users: UserRepository
    private readonly jwt: JwtService
  
    public constructor (tokens: RefreshTokensRepository, users: UserRepository, jwt: JwtService) {
      this.tokens = tokens
      this.users = users
      this.jwt = jwt
    }
  
    public async generateAccessToken (user: { id, username, role }): Promise<string> {
      const opts: SignOptions = {
        ...BASE_OPTIONS,
        subject: String(user.id),
      }
  
      return this.jwt.signAsync({}, opts)
    }
  
    public async generateRefreshToken (user: { id, username, role }, expiresIn: number): Promise<string> {
      const token = await this.tokens.createRefreshToken(user, expiresIn)
  
      const opts: SignOptions = {
        ...BASE_OPTIONS,
        expiresIn,
        subject: String(user.id),
        jwtid: String(token.id),
      }
  
      return this.jwt.signAsync({}, opts)
    }
  
    public async resolveRefreshToken (encoded: string): Promise<{ user: { id, username, role }, token: RefreshToken }> {
      const payload = await this.decodeRefreshToken(encoded)
      const token = await this.getStoredTokenFromRefreshTokenPayload(payload)
  
      if (!token) {
        throw new UnprocessableEntityException('Refresh token not found')
      }
  
      if (token.is_revoked) {
        throw new UnprocessableEntityException('Refresh token revoked')
      }
  
      const user = await this.getUserFromRefreshTokenPayload(payload)
  
      if (!user) {
        throw new UnprocessableEntityException('Refresh token malformed')
      }
      const userObj = {
        id: user.id,
        username: user.username,
        role: user.role,
      }
      return { user: userObj, token }
    }
  
    public async createAccessTokenFromRefreshToken (refresh: string): Promise<{ token: string, user: { id, username, role } ,refreshToken: string}> {
      const { user } = await this.resolveRefreshToken(refresh)
  
      const token = await this.generateAccessToken(user)
      const refreshToken = await this.generateRefreshToken(user, jwtConfig.expiresIn * 100)

      return { token, user, refreshToken}
    }
  
    private async decodeRefreshToken (token: string): Promise<RefreshTokenPayload> {
      try {
        return await this.jwt.verifyAsync(token)
      } catch (e) {
        if (e instanceof TokenExpiredError) {
          throw new UnprocessableEntityException('Refresh token expired')
        } else {
          throw new UnprocessableEntityException('Refresh token malformed')
        }
      }
    }
  
    private async getUserFromRefreshTokenPayload (payload: RefreshTokenPayload): Promise<User> {
      const subId = payload.sub
  
      if (!subId) {
        throw new UnprocessableEntityException('Refresh token malformed')
      }
  
      return this.users.findOne(subId)
    }
  
    private async getStoredTokenFromRefreshTokenPayload (payload: RefreshTokenPayload): Promise<RefreshToken | null> {
      const tokenId = payload.jti
  
      if (!tokenId) {
        throw new UnprocessableEntityException('Refresh token malformed')
      }
  
      return this.tokens.findTokenById(tokenId)
    }
  }