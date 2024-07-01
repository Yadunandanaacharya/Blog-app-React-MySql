import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
    //check user exists: with mail and name
    const querySelect = "SELECT * FROM users_table WHERE EMAIL= ? OR USER_NAME=?"

    db.query(querySelect, [req.body.email, req.body.username], (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length) {
            return res.status(409).json("User already exists");
        }

        //hash the password and create a user 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // const queryInsert1 = "INSERT INTO users_table('user_name','email','password')"
        const queryInsert = 'INSERT INTO users_table (user_name, email, password) VALUES (?, ?, ?)';
        const values = [req.body.username, req.body.email, hash]

        db.query(queryInsert, values, (err, data) => {
            if (err) { return res.json(err); }
            return res.status(200).json("User has been created");
        })
    })
}

export const login = (req, res) => {
    //check user
    const querySelect = "SELECT * FROM users_table WHERE user_name=?"

    db.query(querySelect, [req.body.username], (err, data) => {
        if (err)
            return res.json(err);

        if (data.length === 0)
            return res.status(409).json("User not found!");

        //check password 
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password");
        
        //store it in cookie of browser
        // const token = jwt.sign({id:data[0].user_id},"jwtkey");
        //expires in 1minute
        const token = jwt.sign({id:data[0].user_id},"jwtkey",{expiresIn:"30m"});

        const{password, ...other} = data[0];
        res.cookie("access_token", token, { httpOnly: true}).status(200).json(other);
    
        // res.cookie("access_token", token, 
        // { httpOnly: true, domain: 'localhost', path: '/',sameSite:"none",secure:true }).status(200).json(other);
    });
}

export const logout = (req, res) => {
    // const { cookieValue } = req.body;
    res.clearCookie('access_token', {httpOnly: true});
    res.end().status(200)
    .json("User has been logged out");
    
    // res.clearCookie('access_token', {httpOnly: true,domain: 'localhost', path: '/'
    //     ,sameSite:"none",secure:true
    // }).status(200)
    // .json("User has been logged out");
   
}

