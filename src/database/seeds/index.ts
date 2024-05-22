import { SeedUser1715881887915 } from './1715881887915-seed-user';

let seeds: any[] = [];
if (process.env.APP_MODE?.toLowerCase() !== 'production') {
  // for development or staging env
  seeds = [SeedUser1715881887915];
}

export const Seeds = seeds;
