var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var s3 = new AWS.S3();

function functionName() {
    
}

module.exports.handler = functionName;
