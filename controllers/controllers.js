require('dotenv').config();
const express = require('express');
const https = require('https');



const payStack = {

    acceptPayment: async (req, res ) => {
        try{
            // request body from the clients
            const email = req.body.email;
            const amount = req.body.amount;

            // params
            const params =  JSON.stringify({
                "email": email,
                "amount": amount * 100

            })
            // options
            const options = {
                hostname: 'api.paystack.co',
                port: 443,
                path: '/transaction/initialize',
                method: 'POST',
                headers: {
                    Authorization: process.env.sk_test_fecd8804bac7aff7b275bc615a1c499b942e55a1,// where you place your secret
                    'Content-Type': 'application/json'
                }

            }
            // client request to paystack API
            const clientReq = https.request(options, apiRes => {
                let data = ''
                apiRes.on('data', (chunk) =>{
                    data += chunk
                });
                apiRes.on('end', () =>{
                    console.log(JSON.parse(data));
                    return res.status(200).json(data);
                })
                
                }).on('error',error => {
                    console.error(error)
                })
                clientReq.write(params)
                clientReq.end()

        } catch (error) {
            // Handle any errors that occur during the request
            console.error(error);
            res.status(500).json({ error: 'An error occurred during the request'});

    }
},
}

const initializePayment = payStack;
module.exports = initializePayment;