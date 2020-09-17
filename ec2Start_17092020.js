var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2();
var sns = new AWS.SNS();

function initFunction() {
    sendStartNotification();
}

function sendStartNotification() {
    var params = {
        Message: 'Hello Hooman, Your Machine is starting, No action required from your side at present. This message was triggered automatically at' + Date(), /* required */
        Subject: 'STOP-START-101',
        TopicArn: 'STRING_VALUE'
      };
      sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
      startEC2Instance();
}

function startEC2Instance() {
    var params = {
        InstanceIds: [
           "i-07360495e9a390c33"
        ]
       };
       ec2.stopInstances(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
       });
       sendEndNotification();
}

function sendEndNotification() {
    var params = {
        Message: 'Hello Hooman, Your Machine has automatically started up, No action required from your side as present. This message was triggered automatically at' + Date(), /* required */
        Subject: 'STOP-START-102',
        TopicArn: 'STRING_VALUE'
      };
      sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
}

module.exports.handler = initFunction;