const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const authRoutes = require('./routes/auth');
const newsController = require('./controllers/newsController');
const transporter = require('./controllers/emailer');

const PORT = process.env.PORT || 3000;

const app = express();

// Configuração para parsear JSON e dados de formulário
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do armazenamento de arquivos com Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Sessões para login
const sessionSecret = process.env.SECRET || 'espaço-blue';
app.use(session({
    secret: sessionSecret, 
    resave: false, 
    saveUninitialized: false,
    name: 'session'
}));

// Usar as rotas de autenticação
app.use('/auth', authRoutes);

// Rota para servir a página de login e outras páginas
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.get('/news', newsController.getNews);
app.get('/news/:id', newsController.fetchNewsById);
app.post('/news', newsController.putNews);

app.get('/noticia', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/verNoticia.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.get('/loggedin', (req, res) => {
    res.status(200).json({ message: req.session.loggedIn ? "Sim" : "Não" });
});

// Rotas para enviar currículos e mensagens
app.post('/send-resume', upload.single('resume'), (req, res) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'vagasongespacoazul@gmail.com',
        subject: 'Novo Currículo',
        text: `Recebido um novo currículo de ${req.body.name}.`,
        attachments: [{
            filename: req.file.originalname,
            path: req.file.path
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Currículo enviado com sucesso!');
    });
});

app.post('/send-message', (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: 'ongespacoazul@gmail.com',
        subject: `Mensagem de ${req.body.name}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Mensagem enviada com sucesso!');
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});