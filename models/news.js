const db = require('../db/database');

class News {
    static getNews(callback) {
        db.all("SELECT * FROM news", [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        }); 
    }

    static fetchNewsById(id, callback) {
        db.get("SELECT * FROM news WHERE id = ?", [id], (err, row) => {
            callback(err, row);
        }); 
    }

    static putNews(title, img_url, content, callback){
        const stmt = db.prepare("INSERT INTO news (img_url, title, content) VALUES (?, ?, ?)");

        stmt.run([img_url, title, content || ''], err => {
            callback(err, this.lastID);
        });

        stmt.finalize(); 
    }
}

module.exports = News;
