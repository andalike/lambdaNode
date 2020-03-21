var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
var sns = new AWS.SNS();
var ec2 = new AWS.EC2();


function functionName() {
    sendStartEmail();
}

function sendStartEmail() {
    var params = {
        Message: 'Dear User, Your Machine is Stopped. AWS will not attempt to start the instance', /* required */
        Subject: 'Notification: Start',
        TopicArn: 'arn:aws:sns:us-west-2:016124700666:topicEC2'
    };
    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            startEC2Instance();
            console.log(data);           // successful response
        }
    });
}

function startEC2Instance() {
    var params = {
        InstanceIds: [
            "i-06427dc5e236cb5a6"
        ]
    };
    ec2.startInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            sendEndEmail();
            console.log(data);           // successful response
        }
    });

}

function sendEndEmail() {
    var params = {
        Message: 'Dear User, Your Machine is Started. No Humar Intervention is Required', /* required */
        Subject: 'Notification: Stop',
        TopicArn: 'arn:aws:sns:us-west-2:016124700666:topicEC2'
    };
    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            startEC2Instance();
            console.log(data);           // successful response
        }
    });
}


module.exports.handler = functionName;
