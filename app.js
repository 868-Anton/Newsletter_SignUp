
const express = require('express');
const request = require('request');
const https = require('https')
const port = 4000;
const app =express();
app.use(express.static(`public`));
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{

  res.sendFile(`${__dirname}/signup.html`)
});
app.post('/',(req,res)=>{
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [ 
      {
      email_address: email,
      status:"subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName
        },
      }
    ]
    };

    const jsonData = JSON.stringify(data);
    const url ='https://us20.api.mailchimp.com/3.0/lists/a2ab459afd'
    const options = {
      method: "POST",
        auth: "Anton1:6ebc1058d6927636a8b1ed71c9195dee-us20"
  }
  const request = https.request(url,options, (response)=>{
    response.on('data', (data)=>{
      console.log(JSON.parse(data));
    });
  request.write(jsonData);
  request.end();
  });

  

  

  
  
  });


app.listen(port,(req,res)=>{
  console.log(`app is listening at http://localhost:${port}`)
}
)





















//Api Key
// 6ebc1058d6927636a8b1ed71c9195dee-us20


// list id
// a2ab459afd

