var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2();

function functionName() {
    var params = {
  InstanceIds: [
     "i-013b083c21b722871"
  ]
 };
 ec2.stopInstances(params, function(err, data) {
   if (err)
   {
       console.log(err, err.stack); // an error occurred
   }
   else
   {
   console.log(data);           // successful response
}
   /*
   data = {
    StoppingInstances: [
       {
      CurrentState: {
       Code: 64,
       Name: "stopping"
      },
      InstanceId: "i-1234567890abcdef0",
      PreviousState: {
       Code: 16,
       Name: "running"
      }
     }
    ]
   }
   */
 });
}

module.exports.handler = functionName;