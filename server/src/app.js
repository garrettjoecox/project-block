import Koa from 'koa';
import serve from 'koa-static';
import logger from 'koa-logger';
import { join } from 'path';

const port = process.env.PORT || 9000;
const app = new Koa();

app.use(logger());
app.use(serve(join(__dirname, '../../client')));

app.listen(port, () => console.log(`Listening on ${port}`));

export default app;