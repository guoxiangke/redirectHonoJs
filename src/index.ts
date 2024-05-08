import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => {
  let url = c.req.query('r')
  if(!url) return c.text('Hello!')
  // Header may not contain more than a single header, new line detected
  url.replaceAll('\r','').replaceAll('\n','').replaceAll('%0A','');

  // https://developer.mozilla.org/en-US/docs/Web/API/URL
  const parsedUrl = new URL(url);

  parsedUrl.search = ""; //Remove any params
  let redirectUrl = parsedUrl.href+='?from=redirect'
  return c.redirect(parsedUrl.href)
})


app.get('/cc1', (c) => c.redirect('https://baidu.com?from=cc1'))
app.get('/cc2', (c) => c.redirect('https://baidu.com?from=cc2'))
app.get('/cc3', (c) => c.redirect('https://baidu.com?from=cc3'))
app.get('/365', (c) => c.redirect('https://www.jidu365.com?from=cc'))
app.get('/zm', (c) => c.redirect('https://influx.simai.life/api?redirect=https://navs.savefamily.net?metric=NFC%26keyword=nav'))
app.get('/dawei', (c) => c.redirect('https://navs.savefamily.net/?vips=10,15,11,16,17'))
app.get('/luke', (c) => c.redirect('https://navs.savefamily.net/?sponsor=Luke'))
app.get('/mysg', (c) => c.redirect('http://napi.yageapp.com/api/t.php?k=6b42e8370481f752'))

serve(app)
