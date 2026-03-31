const db = require('../db/database');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error("Error creating users table", err);
        } else {
            console.log("Users table created successfully");
        }
        db.close();
    });
});
