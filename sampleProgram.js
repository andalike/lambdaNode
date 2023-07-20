// AWS Libraries
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

// Services of AWS required
var s3 = new AWS.S3();


//Actual code
function initFunction() {  
}

module.exports.handler = initFunction;
