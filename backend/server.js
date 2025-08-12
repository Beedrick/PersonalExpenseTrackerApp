const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

mongoose.connect(
    process.env.MONGO_URI, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log('DB Connection to TransactionWebApp Successful...'))
.catch((err) => console.error('MongoDB Connection error', err));

app.use(express.json());

app.get('/test', (req, res) => {
    response = res.json({ status: 'Server is running' });
    if(response != null){
        console.log(response);
    }else{
        console.log('failed');
    }

});
  
const PORT = 3000;
const transactionsRouter = require('./routes/transactions');
const userRouter = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use(cookieParser());
app.use('/transactions', transactionsRouter);
app.use('/user', userRouter);
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));