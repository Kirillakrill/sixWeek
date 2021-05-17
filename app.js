export default (express, bodyParser, createReadStream, writeFileSync, crypto, http, m, User) => {
    const app = express();
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    const json_parser = bodyParser.json();
    const url = 'mongodb+srv://reader:Vpsral9003@cluster0.rabsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

    app
    .use((r, res, next) => r.res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,OPTIONS,DELETE"}) && next())
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
    .post('/insert/', urlencodedParser, async (req, res) => {
        const log = req.body.login;
        const pass = req.body.password;
        const url = req.body.URL;

        await m.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        const newUser = new User({login: log, password: pass});
        try {
            await newUser.save();
            res.status(201);
        } catch (e) {
            res.status(400);
        }
        res.end();
    })
    .all('/*', r => r.res.send('akrillsm9003'));

    return app;
}