const express = require('express');
const app = express();

const device = require('express-device');
app.use(device.capture());
// const bodyParser = require('body-parser')

const compression = require('compression');
app.use(compression());

app.use(express.static('./public'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(device.capture());

if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.get('/', (req, res) => {
    // console.log('DEVICE: ', req.device.type);
    // if (req.device.type == 'phone' || req.device.type == 'tablet') {
    //     res.sendFile(__dirname + '/mobile.html');
    // } else {
        res.sendFile(__dirname + '/index.html');
    // }
})

app.get('*', (req, res) => res.redirect('/'));

app.listen(process.env.PORT || 8080, () => console.log(`listening on 8080...`));
