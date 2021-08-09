const express = require("express");
var http = require('http');
const app = express();
var server = http.createServer(app);
const {google} = require("googleapis");
app.use(express.static("../JSON")); // exposes index.html, per below
app.get('/getUnfulfilledOrders',function(req,res){
  req.headers['mode'] = 'no-cors'
  require('./getUnfulfilledOrders').req;
  res.send("orders fetched!");
});
app.get('/setParcel',function(req,res){
  req.headers['mode'] = 'cors'
  require('./setParcel').req;
  res.body = global.shippingLabel;
  res.send()
  
});
app.get("/fulfillSheets", async (req , res) =>{
  const auth = new google.auth.GoogleAuth({
    keyFile:"credentials.json",
    scopes:"https://www.googleapis.com/auth/spreadsheets"
  });


  //client instance

  const client =  await auth.getClient();

  // googlesheets instance

  const googleSheets = google.sheets({version: "v4", auth:client});
  const spreadsheetId = "1hKPmIob8qWIFeLOQokY70aDeDlJBCLcaChQiwo7L1JM";
  
  // get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,

  });
  var sku=[];
  for(var counter = 0; counter< require('./getUnfulfilledOrders').finalOrders.length ; counter++){
sku.push(require('./getUnfulfilledOrders').finalOrders[counter].itemsSku)
  }
  //write row(s) to spreadsheet
 await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range:"Out",
    valueInputOption:"RAW",
    resource:{
      values:sku,
    }
  })


  res.send("sheet updated");

});
server.listen(8081,(req,res) => console.log("running on 8081"));
