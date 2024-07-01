import mysql from 'mysql2'

export const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"pass123",
    database:"blog_app"
})