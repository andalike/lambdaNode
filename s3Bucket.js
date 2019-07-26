var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var s3 = new AWS.S3();

function s3Operations() {
    var params = {
        Bucket: "techmax20192020"
    };
    s3.createBucket(params, function (err, data) {
        if (err) {
            console.log("Error in Creating Bucket->" + err + err.stack);
        }
        else {
            console.log("Success in creating bucket->" + data);
        }

    });

}



module.exports.handler = s3Operations;

