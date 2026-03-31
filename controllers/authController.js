const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { username, password } = req.body;
    
    // Busca o usuário pelo nome de usuário
    User.findByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        
        // Compara a senha fornecida com a senha hash armazenada no banco de dados
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (match) {
                // Se as senhas coincidem, login bem-sucedido
                //res.status(200).json({ message: "Login bem-sucedido" });
                req.session.regenerate(function (err) {
                    if (err) next(err)

                    req.session.loggedIn = true;
                    req.session.save(function (err) {
                        if (err) return next(err)
                        res.redirect('/')
                    })
                })
            } else {
                // Senha incorreta
                res.status(401).json({ error: "Senha incorreta" });
            }
        });
    });
};
