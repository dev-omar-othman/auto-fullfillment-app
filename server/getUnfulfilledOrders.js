var https = require('follow-redirects').https;
var fs = require('fs');
var options = {
  'method': 'GET',
  'hostname': 'mollyandstitchus.myshopify.com',
  'path': '/admin/api/2021-07/orders.json?fulfillment_status=unshipped',
  'headers': {
    'Authorization': 'Basic OTJjOWE3NDdmMjZmODgzNjM4OGM4NDFhMDYzZjMwZDI6c2hwcGFfNDg4NDNmNTNjNDYyZmI5OGRiY2U2ZjI2NDBlNzE2MjY='
  },
  'maxRedirects': 20
};
let finalOrders = []
var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end",async function (chunk) {
    var body = Buffer.concat(chunks);
    var orders = JSON.parse(body.toString());
    for(var i = 0; i < orders.orders.length; i++){
        
        let orderData = {
            orderTotalPrice : orders.orders[i].total_price,
            orderId: orders.orders[i].name,
            destination: orders.orders[i].shipping_address.address1,
            customer: orders.orders[i].shipping_address.name,
            itemsSku:[],
            orderDescription:[] 
        }
        for(var j = 0; orders.orders[i].line_items.length > j ; j++){
            orderData.orderDescription.push (orders.orders[i].line_items[j].title +" "+ orders.orders[i].line_items[j].variant_title);
            orderData.itemsSku.push(orders.orders[i].line_items[j].sku);
        }
        finalOrders.push(orderData);
    
    }
    fs.writeFile('../JSON/unfulfilledOrders.json', JSON.stringify(finalOrders,null,2), err => {
      if (err) {
       console.log('Error writing file', err)
     } else {
       console.log('JSon updated')
       }
     })
  });

  res.on("error", function (error) {
    console.error(error);
  });0
});

req.end();

module.exports.req = req;
module.exports.finalOrders = finalOrders;