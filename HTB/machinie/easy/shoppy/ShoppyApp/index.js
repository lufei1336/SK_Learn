const express = require('express');
const mongoose = require('mongoose');
const User = require('./schemas/user');
const Product = require('./schemas/product');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const mongoUri = 'mongodb://127.0.0.1/shoppy';
mongoose.connect(mongoUri, function(err, db) {
    if(err) throw err;
    console.log("Databases created successfully!");
});

app.use(session({
    secret: 'DJ7aAdnkCZs9DZWx',
    store: MongoStore.create({mongoUrl: mongoUri}),
    resave: false,
    saveUninitialized: false
}));

app.disable('x-powered-by');
app.set('view engine', 'ejs');

app.use(express.static('static'));
app.use('/exports', express.static('exports'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/views'});
});

app.get('/admin', async (req, res) => {
    if (req.session.username) {
        const data = await Product.find({});
        res.render('admin.ejs', {products: data});
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    if (req.query.error === 'WrongCredentials') {
        res.sendFile('login-error.html', {root: __dirname + '/views'});
    } else {
        res.sendFile('login.html', {root: __dirname + '/views'});
    }
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === undefined || password === undefined) {
        res.status(400).send('Bad Request');
        return;
    }
    const passToTest = require('crypto').createHash('md5').update(password).digest('hex');
    const query = { $where: `this.username === '${username}' && this.password === '${passToTest}'` };
    const result = await User.find(query).maxTimeMS(350);
    if (result.length === 0) {
        console.log("result.length === 0");
        res.redirect('/login?error=WrongCredentials');
    } else {
        req.session.username = req.body.username;
        req.session.save((error) => {
            if (error) {
                res.redirect('/login?error=WrongCredentials');
            } else {
                res.redirect('/admin');
            }
        });
    }
});

app.get('/admin/search-users', async (req, res) => {
    if (req.session.username) {
        if (Object.keys(req.query).length > 0) {
            try {
                const query = { $where: "this.username === '" + req.query.username + "\'" };
                const data = await User.find(query).maxTimeMS(350);
                if (data.length === 0) {
                    res.render('search.ejs', {info: 'No results for your search'});
                } else {
                    fs.writeFileSync('./exports/export-search.json', JSON.stringify(data));
                    res.render('search.ejs', {link: 'http://localhost:3000/exports/export-search.json'});
                }
            } catch (e) {
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.render('search.ejs');
        }
    } else {
        res.redirect('/login');
    }
});

app.listen(3000, 'localhost');
console.log("Server start at http://localhost:3000");
