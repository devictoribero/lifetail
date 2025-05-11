export interface TokenGenerator {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
}
