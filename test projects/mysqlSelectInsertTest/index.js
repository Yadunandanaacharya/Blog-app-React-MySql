
import mysql from 'mysql2'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "blog_app"
})
const querySelect = "SELECT * FROM users_table"

db.query(querySelect, (err, data) => {
    if (err) {
        return console.log(err)
    }
    return console.log(data);
})
