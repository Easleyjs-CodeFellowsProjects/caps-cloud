// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-west-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

exports.createDelivery = ( async deliveryDetails => {    
    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
            "Title": {
                DataType: "String",
                StringValue: "Delivery"
            },
        },
        MessageBody: await JSON.stringify(deliveryDetails),
        QueueUrl: "https://sqs.us-west-2.amazonaws.com/067714926294/" + deliveryDetails.storeName,
    };
    
    sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
})