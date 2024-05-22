export interface RedisConfig {
  redisHost: string | undefined;
  redisPort: number | undefined;
  redisUsername: string | undefined;
  redisPassword: string | undefined;
  redisDatabase: number | undefined;
  redisSsl: boolean;
  redisCacheTtl: number | undefined;
}
