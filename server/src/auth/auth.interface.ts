export interface AuthInterface {
  validatePassword(password: string): Promise<boolean>;
}
