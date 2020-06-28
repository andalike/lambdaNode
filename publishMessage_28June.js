var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var sns = new AWS.SNS();


function functionName() {
    var params = {
        Message: 'Hello Folks!',
        Subject: 'Hello From AWS',
        TopicArn: 'arn:aws:sns:us-east-1:016124700666:dodulsWebsite'
      };
      sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
}

module.exports.handler = functionName;