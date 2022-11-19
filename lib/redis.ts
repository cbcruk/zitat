import Redis from 'ioredis'

const url = process.env.REDIS_URL || ''
const redis = new Redis(url)

export const ZITAT_WEEKLY = 'ZITAT_WEEKLY'

export const getResult = () => redis.get(ZITAT_WEEKLY)

export default redis
