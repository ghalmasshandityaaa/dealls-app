import { IIdentity } from '../../common/interfaces';

export interface ITokenService {
  validate(token: string): Promise<IIdentity>;
  generateAccessToken(identity: IIdentity): Promise<string>;
  generateRefreshToken(identity: IIdentity): Promise<string>;
}
