const transporter = require('./emailer');

exports.sendResume = (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: 'vagasongespacoazul@gmail.com',
        subject: 'Novo Currículo Recebido',
        text: `Recebido um novo currículo de: ${req.body.name}`,
        attachments: [{
            filename: req.file.filename,
            path: req.file.path
        }]
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.status(500).send("Erro ao enviar e-mail.");
        }
        res.send("Currículo enviado com sucesso.");
    });
};

exports.sendMessage = (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: 'ongespacoazul@gmail.com',
        subject: `Mensagem de ${req.body.name}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.status(500).send("Erro ao enviar mensagem.");
        }
        res.send("Mensagem enviada com sucesso.");
    });
};
