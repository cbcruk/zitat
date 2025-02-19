import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { weekly } from './weekly'
import { revalidate } from './revalidate'
import { bulk } from './bulk'
import { algoria } from './algoria'

export const dynamic = 'force-dynamic'

const app = new Hono().basePath('/api')

app.route('/weekly', weekly)
app.route('/revalidate', revalidate)
app.route('/bulk', bulk)
app.route('/algoria', algoria)

export const POST = handle(app)
export const GET = handle(app)
