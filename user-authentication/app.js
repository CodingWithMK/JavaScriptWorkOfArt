const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // views dizinini ayarlama

// Kullanıcı veritabanı (örnek olarak)
const users = [
    { email: 'user1@example.com', password: 'pass1' },
    { email: 'user2@example.com', password: 'pass2' }
];

// Ana sayfa rotası
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Login sayfasını render et
app.get('/login', (req, res) => {
    res.render('login', { message: '', messageType: '' });
});

// Sign Up sayfasını render et
app.get('/signup', (req, res) => {
    res.render('signup', { message: '', messageType: '' });
});

// Login işlemi
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.render('login', { message: 'Login successful!', messageType: 'success' });
    } else {
        res.render('login', { message: 'Invalid email or password.', messageType: 'error' });
    }
});

// Sign Up işlemi
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const userExists = users.find(u => u.email === email);

    if (userExists) {
        res.render('signup', { message: 'Email already exists.', messageType: 'error' });
    } else {
        users.push({ email, password });
        res.render('signup', { message: 'Sign up successful! You can now log in.', messageType: 'success' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
