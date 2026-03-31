const db = require('../db/database');

class User {
    static create(username, password, callback) {
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        stmt.run(username, password, function(err) {
            callback(err, this.lastID);
        });
        stmt.finalize();
    }

    static findByUsername(username, callback) {
        db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
            callback(err, row);
        });
    }
}

module.exports = User;
