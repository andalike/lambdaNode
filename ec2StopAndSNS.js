var AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });
var sns = new AWS.SNS();
var ec2 = new AWS.EC2();


function startFunction() {
    sendNotification('EC2 Starts', 'Hello Your instance has started');
    startInstance();
}

function sendNotification(subject,message) {
    var params = {
        Message: message,
        Subject: subject,
        TopicArn: 'someValue'
    };
    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        }
        else {
            console.log(data);
        }
    });
}

function startInstance() {
    var params = {
        InstanceIds: [
            "i-1234567890abcdef0"
        ]
    };
    ec2.startInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            sendNotification('EC2 Start Error, Look into it', 'Hello Your instance has issues, Please check');
        }
        else {
            console.log(data);
            sendNotification('EC2 Started, Nothing to do', 'Hello Your instance has started, Nothing to do from your side');
        }
    });
}

module.exports.handler = startFunction;