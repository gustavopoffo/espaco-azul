const News = require("../models/news");

exports.getNews = (_, res) => {
    // Busca o usuário pelo nome de usuário
    News.getNews((err, news) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(200).json({news: news})
    });
};

exports.fetchNewsById = (req, res) => {
    // Busca o usuário pelo nome de usuário
    News.fetchNewsById(req.params.id,(err, news) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(200).json({news: news})
    });
};

exports.putNews = (req, res) => {
    if (!req.session.loggedIn) {
        res.status(403).json({ message: "Não autorizado" });
        return;
    }

    const { img_url, title, content } = req.body;

    // Check if all required fields are provided
    if (!img_url || !title || !content) {
        res.status(400).json({ message: "img_url, title and content are required" });
        return;
    }
    News.putNews(title, img_url, content, (err) => {
        if (err) {
            res.status(500).json({ message: "Database error", error: err.message });
        } else {
            res.redirect(302, `/noticias.html`);
        }
    });
}
