import Redis from 'ioredis'

const path = process.env.REDIS_URL || ''

const redis = new Redis(path)

export const ZITAT_WEEKLY = 'ZITAT_WEEKLY'

export const getResult = () => redis.get(ZITAT_WEEKLY)

export default redis
