var AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });
var s3 = new AWS.S3();

function initialFunction() {
    removeBucket();
}

function removeBucket() {
    var params = {
        Bucket: "naveen14march2021"
    };
    s3.deleteBucket(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
        }
    });
}

module.exports.handler = initialFunction;
