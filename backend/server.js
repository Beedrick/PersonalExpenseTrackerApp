const express = require('express');
const mongoose = require('mongoose');
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
app.use('/api/transactions', transactionsRouter);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));