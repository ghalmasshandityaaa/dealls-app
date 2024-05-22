export enum Package {
  STANDARD = 'standard',
  VERIFIED = 'verified',
  NO_QUOTA = 'no_quota',
}
export interface IIdentity {
  id: string;
  package: Package;
  // todo: add more properties
}
