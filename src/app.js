const express = require('express');
const path = require('path');
const knex = require('knex');
const knexConfig = require('./knexfile');
const { write } = require('fs');
const db = knex(knexConfig.development);
const app = express();
const port = 5500;

app.use(express.json()); // JSON istekleri işlemek için middleware
app.use(express.static(path.join(__dirname, 'front-end')));
app.use(express.urlencoded({ extended: true }));

const mockUsers = [
    { email: "example@hotmail.com", password: "123123" },
    { email: "example@gmail.com", password: "545454" },
]

// Ana sayfa için route
app.get('/', (req, res) => {
    res.send("Hoşgeldiniz")
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end', 'register.html'))
});

// Kullanıcı oluşturma route
app.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const isUserExists = mockUsers.find(user => user.email === email)
    if (isUserExists) {
        return res.status(400).json({ message: "Sisteme zaten kayıtlısınız." })
    } else {
        mockUsers.push({ email, password })
        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi." })
        console.log(mockUsers)
    }
    // const { password, confirmPassword } = req.params;
    // console.log(email, password, confirmPassword)

    // if (password !== confirmPassword) {
    //     return res.status(400).json({ message: 'Girdiğiniz şifreler eşleşmiyor.' });
    // }

    // try {
    //     await db('users').insert({ email, password });
    //     res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.' });
    // } catch (error) {
    //     console.error('Kullanıcı kaydı sırasında bir hata oluştu:', error);
    //     res.status(500).json({ message: 'Kullanıcı kaydı sırasında bir hata oluştu.' });
    // }
});

// Express uygulamasını dinlemeye başla
app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} adresinde çalışıyor`);
});
