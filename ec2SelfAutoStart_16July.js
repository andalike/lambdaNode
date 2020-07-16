var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var sns = new AWS.SNS();
var ec2 = new AWS.EC2();

function intro() {
    initNotification();
}

function initNotification() {
    var subject = "Init Notification";
    var message = "Hello the EC2 instance has stopped, AWS will now try to start the instance";
    sendNotification(subject, message);
    startInstance();
}

function startInstance() {
    var params = {
        InstanceIds: [
            "i-02c2101e4c676cc00"
        ]
    };
    ec2.startInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            var subject = "Error Notification";
            var message = "Hello the EC2 instance has Failed to started, Human intervention is required, The Error reason is "+err.stack;
            sendNotification(subject, message);
        }
        else {
            console.log(data);           // successful response
            endNotification();
        }
    });
}

function endNotification() {
    var subject = "End Notification";
    var message = "Hello the EC2 instance has started, No Human intervention is required";
    sendNotification(subject, message);
}

function sendNotification(subject, message) {
    var params = {
        Message: message,
        Subject: subject,
        TopicArn: 'arn:aws:sns:us-east-1:016124700666:developers'
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

module.exports.handler = intro;