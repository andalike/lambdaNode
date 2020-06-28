var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2();
var sns = new AWS.SNS();


function functionName() {
    sendInitialEmail();
}

function sendInitialEmail(){
    var params = {
        Message: 'Danger!!! Machine has stopped, AWS will not Try to Auto-Start the Machine',
        Subject: 'Machine Stopped, Initial Notification',
        TopicArn: 'arn:aws:sns:us-east-1:016124700666:dodulsWebsite'
      };
      sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
      startMachine();
}

function startMachine(){
    var params = {
        InstanceIds: [
           "i-013b083c21b722871"
        ]
       };
       ec2.startInstances(params, function(err, data) {
         if (err)
         {
             console.log(err, err.stack); // an error occurred
         }
         else
         {
         console.log(data);           // successful response
         sendEndEmail();
      }
       });
}

function sendEndEmail(){
    var params = {
        Message: 'Hello Hooman, Machine was auto-started, Nothing to Do, Just Chill!',
        Subject: 'Machine Auto Started, End Notification',
        TopicArn: 'arn:aws:sns:us-east-1:016124700666:dodulsWebsite'
      };
      sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
}

module.exports.handler = functionName;