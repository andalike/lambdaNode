var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

function instanceOperations () {
var instanceID='i-07bcd8d2b5e08c6e4';
var status='START';

var params = {
  InstanceIds: [instanceID],
  DryRun: true
};

if (status.toUpperCase() === "START") {
  ec2.stopInstances(params, function(err, data) {
    if (err && err.code === 'DryRunOperation') {
      params.DryRun = false;
      ec2.startInstances(params, function(err, data) {
          if (err) {
            console.log("Error in Stopping Instance->" + err);
          } else if (data) {
            console.log("Success in Starting Instane->", data.StartingInstances);
          }
      });
    } else {
      console.log("You don't have permission to start instances.");
    }
  });
} else if (status.toUpperCase() === "STOP") {
  ec2.stopInstances(params, function(err, data) {
    if (err && err.code === 'DryRunOperation') {
      params.DryRun = false;
      ec2.stopInstances(params, function(err, data) {
          if (err) {
            console.log("Error in Stopping Instance->" + err);
          } else if (data) {
            console.log("Success in Starting Instane->", data.StoppingInstances);
          }
      });
    }

    else {
      console.log("You don't have permission to stop instances");
    }
  });
}
else if (status.toUpperCase() === "REBOOT") {
    ec2.stopInstances(params, function(err, data) {
      if (err && err.code === 'DryRunOperation') {
        params.DryRun = false;
        ec2.stopInstances(params, function(err, data) {
            if (err) {
              console.log("Error in Stopping Instance->" + err);
            } else if (data) {
              console.log("Success in Starting Instane->", data.StoppingInstances);
            }
        });
      }

      else {
        console.log("You don't have permission to stop instances");
      }
    });
  }
}

module.exports.handler = instanceOperations;

