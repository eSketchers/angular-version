require('dotenv').config();
const express = require("express");
const plaid = require("plaid")
const app = express();
const PORT = 4100;

// Initialize the Plaid client
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

console.log(client)
app.use(express.json());

//get user account balances
app.post('/accounts_balance', async (req, res) => {
  try{
    const response = await client.getBalance(req.body.access_token).catch((err) => {
      // handle your error if occurs
      console.log(err);
    });
    //const accounts = response.accounts;
    res.json({
      accounts: response.accounts
    });
  }
  catch(e){
    console.log(e)
  }
 
});

//endpoint exchanges public token for an access token its currently working on this part
app.post('/exchange_public_token', async (request, res, next) => {
  try{
  //public token cant be found
    const response = await client
    .exchangePublicToken(request.body.public_token)
    .catch((err) => {
      console.log(err)
    });
    // set accessToken and itemId
  const accessToken = response.access_token;
  const itemId = response.item_id;
  
  res.json({
    access_token: accessToken,
    item_id: itemId
  });
  console.log("access token below");
  console.log(accessToken);
  }
  catch(e){
    console.log(e)
  }
 
});

//endpoint returns link_token 
app.post('/create_link_token', async (request, response, next) => {
  try{
  
    // 1. Grab the client_user_id by searching for the current user in your database
    const user = "demoUser"
    const clientUserId = "12345";
    
    // 2. Create a link_token for the given user
    const linkTokenResponse = await client.createLinkToken({
      user: {
        client_user_id: clientUserId,
      },
      client_name: 'My Fintech App',
      products: ['transactions'],
      language: 'en',
      country_codes: ['US'],
    });
    const link_token = linkTokenResponse.link_token;
    
    // 3. Send the data to the client
    response.json({ link_token });
  }
  catch(e){
    console.log(e)
  }
 
});

app.listen(PORT, () => {
console.log(`Server running on ${PORT}`);
});
