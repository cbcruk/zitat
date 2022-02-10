// @ts-check
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

export const ZITAT_WEEKLY = 'ZITAT_WEEKLY'

export default redis
