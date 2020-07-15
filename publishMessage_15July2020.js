// Send SNS Message
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var sns = new AWS.SNS();

function goTofirstFunction() {
    var params = {
        Message: 'Hello, If you see this it works',
        Subject: 'Iteration-1',
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

module.exports.handler = goTofirstFunction;
