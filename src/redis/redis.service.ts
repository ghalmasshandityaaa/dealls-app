import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly redisClient: Redis) {}

  async getKeys(pattern: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }

  async insert(key: string, value: string | number): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);

    if (!value) {
      return null;
    } else {
      return JSON.parse(value) as T;
    }
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async validate(key: string, value: string): Promise<boolean> {
    const storedValue = await this.redisClient.get(key);
    return storedValue === value;
  }

  async ping(): Promise<string> {
    return await this.redisClient.ping();
  }
}
