//Change timeout to 20 seconds

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

function instanceOperations() {
    // startInstance();
    stopInstance();
}



function stopInstance() {
    var instanceID = 'i-0df5592e70a0e54b3';
    console.log("Inside Stop Instance");
    var params = {
        InstanceIds: [instanceID]
    };
    ec2.stopInstances(params, function (err, data) {
        if (err) {
            console.log("Error in Stopping Instance->" + err);
        } else if (data) {
            ec2.waitFor('instanceStopped', params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }// an error occurred
                else {
                    console.log("Instance IS Stopped" + JSON.stringify(data));
                    detachVolumes();
                }         // successful response
            });

        }
    });
}

function detachVolumes() {
    console.log("Inside Detach Volume");
    var params = {
        VolumeId: "vol-0cea91c30bb19d12c"
    };
    ec2.detachVolume(params, function (err, data) {
        if (err) {
            console.log("Error in Detaching Volme" + err, err.stack);
        }// an error occurred
        else {
            console.log("Success In Detaching VOlume" +JSON.stringify(data));
            setTimeout(function () {
                attachVolume();
              }, 10000)

        }       // successful response



    });
}

function attachVolume() {
    console.log("Inside Attach Volime");
    var params = {
        Device: "/dev/sda1",
        InstanceId: "i-0df5592e70a0e54b3",
        VolumeId: "vol-0ca2e54e25aa07ed0"
    };
    ec2.attachVolume(params, function (err, data) {
        if (err) {
            console.log("Error in Attaching volume->"+ err, err.stack); // an error occurred
        }
        else {
            console.log("Volume Attached" + JSON.stringify(data));          // successful response
            startInstance();
        }

    });
}


function startInstance() {
    var instanceID = 'i-0df5592e70a0e54b3';
    console.log("Inside Start Instance");
    var params = {
        InstanceIds: [instanceID]
    };
    ec2.startInstances(params, function (err, data) {
        if (err) {
            console.log("Error in Starting Instance->" + err);
        } else if (data) {
            console.log("Success in Starting Instane->", data.StartingInstances);
        }
    });
}

module.exports.handler = instanceOperations;
