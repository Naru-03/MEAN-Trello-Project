import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io'
import mongoose from 'mongoose';
import * as usersController from './controllers/users';
import bodyParser from 'body-parser';

const app = express();
const http = createServer(app);
const io = new Server(http);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is up');
});

app.post('/api/users', usersController.register);

io.on('connection', (socket) => {
    console.log("socket connected");
});

mongoose.connect('mongodb://localhost:27017/eltrello').then(() => {
    console.log("database connected");
    http.listen(4001, () => {
        console.log("server in running");
    });
});



