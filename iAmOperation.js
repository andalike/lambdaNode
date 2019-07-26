var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var iam = new AWS.IAM({ apiVersion: '2010-05-08' });

function iAmOperation() {
    var params = {
        UserName: "Bob11"
    };
    iam.createUser(params, function (err, data) {
        if (err) {
            console.log("Error in Creating User"+ err+  err.stack);
        }
        else { console.log("Data Of Create User->" + JSON.stringify(data)); }
    });
}
module.exports.handler = iAmOperation;

