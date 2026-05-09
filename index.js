const express = require('express');
const morgan = require('morgan'); //used as logger for HTTP request
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

const app = express();

const PORT = 3005;

const limiter = rateLimit({ // i will allow only maximum 5 request from an IP within 2 minutes
    windowMs: 2*60*1000, //= 120000 ms
    max: 5
});

app.use(morgan('combined'));
app.use(limiter);

app.use('/bookingservice', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true
}));

app.get('/home',(req,res) => {
    return res.json({message:"Ok"});
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});