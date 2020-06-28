var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var s3 = new AWS.S3();

function functionName() {
    var params = {
        Bucket: "ramaniBucket28June2020"
       };
       s3.createBucket(params, function(err, data) {
         if (err) {
             console.log(err, err.stack); // an error occurred
         }
         else {
                 console.log(data);           // successful response
         }
         /*
         data = {
          Location: "/examplebucket"
         }
         */
       });
}

module.exports.handler = functionName;