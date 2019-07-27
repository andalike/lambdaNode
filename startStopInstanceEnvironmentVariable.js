var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

function instanceOperations () {
var instanceID=process.env.INSTANCE_ID;
var status=process.env.INSTANCE_STATE;

var params = {
  InstanceIds: [instanceID]
};

if (status.toUpperCase() === "START") {
      ec2.startInstances(params, function(err, data) {
          if (err) {
            console.log("Error in Starting Instance->" + err);
          } else if (data) {
            console.log("Success in Starting Instane->", data.StartingInstances);
          }
      });
} else if (status.toUpperCase() === "STOP") {
      ec2.stopInstances(params, function(err, data) {
          if (err) {
            console.log("Error in Stopping Instance->" + err);
          } else if (data) {
            console.log("Success in Stopping Instane->", data.StoppingInstances);
          }
      });
}
else if (status.toUpperCase() === "REBOOT") {

        ec2.stopInstances(params, function(err, data) {
            if (err) {
              console.log("Error in Rebooting Instance->" + err);
            } else if (data) {
              console.log("Success in Rebooting Instane->", data.StoppingInstances);
            }
        });
      }
}

module.exports.handler = instanceOperations;

