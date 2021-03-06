var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2();

function startInstance() {
    var params = {
        InstanceIds: [
            "i-0298ceafd7d1a48e3"
        ]
    };
    ec2.startInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
        }
    });
}

module.exports.handler = startInstance;