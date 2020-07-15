var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var sns = new AWS.SNS();
var ec2 = new AWS.EC2();

function one() {
    sendIntialMessage();
}

function sendIntialMessage() {
    var params = {
        Message: 'Hi, The Instance will be stopped now. Please check the next message for the status', /* required */
        Subject: 'Initial Status',
        TopicArn: 'arn:aws:sns:us-east-1:016124700666:developers'
    };
    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
            stopInstance();
        }
    });
}

function stopInstance() {
    var params = {
        InstanceIds: [
            "i-0003926a3395fa4c3"
        ]
    };
    ec2.stopInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
            sendFinalMessage();
        }
    });

}

function sendFinalMessage() {
    var params = {
        Message: 'Hi, The Instance has been stopped successfuly, No action required', /* required */
        Subject: 'Final status',
        TopicArn: 'arn:aws:sns:us-east-1:016124700666:developers'
    };
    sns.publish(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
        }
    });
}


module.exports.handler = one;