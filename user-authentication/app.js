const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// Example users
const users = [
    {email: "mikeanderson32@gmail.com", password: "MikeyAnd32."},
    {email: "mikeanderson33@gmail.com", password: "MikeyAnd33."}
];

// Main page route
app.get('/', (request, response) => {
    response.redirect('/login');
});

// Rendering login page
app.get('/login', (request, response) => {
    response.render('login');
});

// Rendering signup page
app.get('/signup', (request, response) => {
    response.render('signup');
});

// Login process
app.post('/login', (request, response) => {
    const {email, password} = request.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        response.send('Login successful!');
    }
    else {
        response.send('Invalid username or password.');
    }
});

// Sign Up Process
app.post('/signup', (request, response) => {
    const {email, password} = request.body;
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        response.send('User already exists!');
    } 
    else {
        users.push({email, password});
        response.send('User created!');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});