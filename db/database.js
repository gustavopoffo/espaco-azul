const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const dbPath = path.resolve(__dirname, 'mydatabase.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Database opened successfully');

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
        });

        const password = process.env.ADMIN_PASSWORD || 'dev_teste';
        const saltRounds = 10;
        bcrypt
        .hash(password, saltRounds)
        .then(hash => {
            db.run('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)', ['admin', hash]);
        })
        .catch(err => console.error(err.message))

        db.run(`CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL UNIQUE,
            description TEXT
        )`, (err) => {
            if (err) {
                console.error("Error creating documents table", err);
            } else {
                console.log("Documents table created successfully");
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img_url TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT
        )`, (err) => {
            if (err) {
                console.error("Error creating documents table", err);
            } else {
                console.log("Documents table created successfully");
            }
        });
 
 
    }
});

module.exports = db;
