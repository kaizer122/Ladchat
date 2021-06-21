import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1"; // replace with own IP
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// configure Redis connection options
const options: Redis.RedisOptions = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
  retryStrategy: (times) => Math.max(times * 100, 3000),
};

// create Redis-based pub-sub
const redisPubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

export default redisPubSub;
