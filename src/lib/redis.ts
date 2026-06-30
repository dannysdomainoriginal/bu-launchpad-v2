import IORedis from "ioredis";

export const redis = new IORedis(
  process.env.CLOUD_REDIS || "redis://localhost:6379",
  { maxRetriesPerRequest: null },
);

redis.on("error", (err) => {
  console.error("Redis error:", err);
});
