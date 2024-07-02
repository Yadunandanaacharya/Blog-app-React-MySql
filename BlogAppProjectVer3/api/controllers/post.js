import { db } from "../db.js"
import jwt from 'jsonwebtoken'

export const getPosts = (req, res) => {
    const query = req.query.category
        ? "SELECT * FROM POSTS_TABLE WHERE CATEGORY=? AND STATUS='ACTIVE'"
        : "SELECT * FROM POSTS_TABLE AND STATUS='ACTIVE'"

    db.query(query, [req.query.category], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const query = `SELECT PT.post_id,UT.user_name,UT.user_img,PT.title,PT.desc,PT.post_img
    ,PT.date,PT.category
     FROM USERS_TABLE AS UT
     JOIN POSTS_TABLE AS PT ON PT.USER_ID=UT.USER_ID AND PT.STATUS='ACTIVE'
     WHERE PT.POST_ID= ?`

    db.query(query, [req.params.id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data[0]);
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated")

        jwt.verify(token, "jwtkey", (err, userInfo) => {
            if (err) {
                return res.status(500).json("Token is not valid");
            }
    
            const postId = req.params.id;
            const query = "INSERT INTO POSTS_TABLE(`title`,`desc`,`post_img`,`date`,`category`,`user_id`) VALUES(?, ?, ?, ?, ?, ?)"
            const values = [
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.date,
                req.body.category,
                userInfo.id,
            ]
            
            db.query(query, values, (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
    
                return res.status(200).json("Post has been created");
            })
        })
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
            return res.status(500).json("Token is not valid");
        }

        const postId = req.params.id;
        const query = "UPDATE POSTS_TABLE SET STATUS='INACTIVE' WHERE post_id=? AND user_id=?"
        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) {
                return res.status(500).json("You can delete only your post");
            }

            return res.status(200).json("Post has been deleted");
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated")

        jwt.verify(token, "jwtkey", (err, userInfo) => {
            if (err) {
                return res.status(500).json("Token is not valid");
            }
    
            const postId = req.params.id;
            const query = "UPDATE POSTS_TABLE SET `title`=?,`desc`=?,`post_img`=?,`category`=? WHERE `post_id`=? AND `user_id`=?"
            const values = [
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.category,
            ]
            
            db.query(query, [...values,postId,userInfo.id], (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
    
                return res.status(200).json("Post has been updated");
            })
        })
}
