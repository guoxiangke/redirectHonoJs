import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
app.get('/hi', (c) => c.text('Hello Hono!'))

app.get('/', (c) => {
  let url = c.req.query('r')
  // Header may not contain more than a single header, new line detected
  url.replaceAll('\r','').replaceAll('\n','').replaceAll('%0A','');

  // https://developer.mozilla.org/en-US/docs/Web/API/URL
  const parsedUrl = new URL(url);

  parsedUrl.search = ""; //Remove any params
  let redirectUrl = parsedUrl.href+='?from=redirect'
  return c.redirect(parsedUrl.href)
})
app.get('/test', (c) => c.redirect('https://baidu.com?from=cc'))
app.get('/cc1', (c) => c.redirect('https://baidu.com?from=cc1'))
app.get('/cc2', (c) => c.redirect('https://baidu.com?from=cc2'))

serve(app)
