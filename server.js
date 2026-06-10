const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const pendingUsers = new Map();

app.post('/api/signup', (req, res) => {
    const { name, surname, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const token = crypto.randomBytes(32).toString('hex');
    pendingUsers.set(email, { name, surname, email, password, token });
    console.log(`[Mock] Verification link: http://localhost:3000/verify?token=${token}&email=${email}`);
    res.json({ message: 'Verification email sent (mock). Check server console.' });
});

app.get('/verify', (req, res) => {
    const { token, email } = req.query;
    const pending = pendingUsers.get(email);
    if (!pending || pending.token !== token) {
        return res.send('Verification failed');
    }
    pendingUsers.delete(email);
    res.send('Email verified! You can close this tab.');
});

app.listen(3000, () => console.log('Backend running on port 3000'));
