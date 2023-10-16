// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-2:067714926294:pickup' //arn from aws

const payload = {
  Subject: 'I love publishing',
  Message: 'TESTING.',
  TopicArn: topic,
}

sns.publish(payload).promise() // method for using promise syntax
.then(data => {
  console.log(data);
})
.catch(e => {
  console.error('Message not Delivered.', e);
});