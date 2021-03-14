var AWS = require('aws-sdk'); // This is Mandaotry
AWS.config.update({ region: 'ap-south-1' }); //Setting my region

var s3 = new AWS.S3();

function naveen() {
    createBucket();
}

function createBucket() {
    var params = {
        Bucket: "naveen14march2021",
    };
    s3.createBucket(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
        }
    });
}

module.exports.handler = naveen;