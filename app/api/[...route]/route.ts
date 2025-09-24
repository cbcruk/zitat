import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { revalidate } from './revalidate'
import { bulk } from './bulk'
import { algoria } from './algoria'
import { quote } from './quote'

export const dynamic = 'force-dynamic'

const app = new Hono().basePath('/api')

app.route('/revalidate', revalidate)
app.route('/bulk', bulk)
app.route('/algoria', algoria)
app.route('/quote', quote)

export const POST = handle(app)
export const GET = handle(app)
