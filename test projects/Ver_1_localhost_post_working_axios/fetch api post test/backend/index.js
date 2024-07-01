import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser  from 'cookie-parser'

const app = express();

app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true // Allow credentials (cookies)
// }));
app.use(express.json())
app.use(cookieParser());

const JWT_SECRET = 'your_jwt_secret';

// Mock user data (replace this with your authentication logic)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

    // app.post("/payment",(req,res)=>{
    //     const body = req.body;
    //     console.log(body)
    //     res.send("ok")
    // })

// Login route
app.post('/payment', (req, res) => {
    const { username, password } = req.body;

    // Mock authentication logic (replace with your actual authentication logic)
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Set token as a cookie
    res.cookie('accessToken', token, { httpOnly: true, domain: 'localhost', path: '/' });
    res.json({ message: 'Login successful' });
});

app.listen(5000, ()=>{
    console.log('first app connected');
})
