var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var iam = new AWS.IAM();

function functionName() {
    var params = {
        GroupName: "helloMikeTest123123"
       };
       iam.createGroup(params, function(err, data) {
         if (err) {
             console.log(err, err.stack); // an error occurred
         }
         else
         {
                 console.log(data);           // successful response
         }
         /*
         data = {
          Group: {
           Arn: "arn:aws:iam::123456789012:group/Admins",
           CreateDate: <Date Representation>,
           GroupId: "AIDGPMS9RO4H3FEXAMPLE",
           GroupName: "Admins",
           Path: "/"
          }
         }
         */
       });
}

module.exports.handler = functionName;