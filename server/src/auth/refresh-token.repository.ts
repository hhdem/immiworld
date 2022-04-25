import { Injectable } from "@nestjs/common"
import { EntityRepository, Repository } from "typeorm"
import { RefreshToken } from "./refresh-token.entity"
import { User } from "./user.entity"

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends Repository<RefreshToken>  {
  public async createRefreshToken (user: { id, username, role }, ttl: number): Promise<RefreshToken> {
    const token = this.create();
    
    token.user_id = user.id
    token.is_revoked = false

    const expiration = new Date()
    expiration.setTime(expiration.getTime() + ttl)

    token.expires = expiration

    return token.save()
  }

  public async findTokenById (id: number): Promise<RefreshToken | null> {
    return this.findOne({
      where: {
        id,
      }
    })
  }
}