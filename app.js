const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegRoute = require('./Routes/RegRoute')
const BlogsRoute = require('./Routes/BlogRoute')
const productRoutes = require('./Routes/productRoutes');
const path = require('path');
const betRoutes = require('./Routes/betRoutes'); // Assuming routes are in routes folder
const winnerRoutes = require("./Routes/winnerRoutes")
const winnerController = require("./Controller/winnerController")
const manageBetRoutes = require("./Routes/manageBetRoute")
const { Server } = require('socket.io'); //
const http = require("http")
require('dotenv/config')

const app = express();



const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow CORS for Socket.IO
    methods: ["GET", "POST"]
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json());


app.use(cors());


app.use('/api',RegRoute);

app.use('/api/posts',BlogsRoute)

app.use('/api/products', productRoutes);

app.use('/api/bets', betRoutes);

app.use('/api/winners', winnerRoutes);

app.use('/api/managebets', manageBetRoutes);

app.post('/api/winner', (req, res) => {
  winnerController.createWinner(req, res, io);
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});



app.listen(process.env.PORT);

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
      },()=>{
    console.log('db connected...!');
})

