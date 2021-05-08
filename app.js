export default (express, bodyParser, fs, crypto, CORS, http) => {
    const app = express();

    app
    .use((r, res, next) => r.res.set(CORS) && next())
    .use(bodyParser.urlencoded({ extended: true }))
    .all('/req/', (req, res) => {
        const addr = req.method === 'POST' ? req.body.addr : req.query.addr;

        http.get(addr, (r, b = '') => {
            r
            .on('data', d => b += d)
            .on('end', () => res.send(b));
        });
    })
    .get('/login/', (req, res) => res.send('akrillsm9003'))   
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/sha1/:input/', (req, res) => res.send(crypto.createHash('sha1').update(req.params.input).digest('hex')))
    .all('/*', r => r.res.send('akrillsm9003'));

    return app;
}