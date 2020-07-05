var AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-south-1' });
var ec2 = new AWS.EC2();

function startOperation() {
    console.log("This means The function startOperation is invoked");
    stopInstance1();
}

function stopInstance1() {
    console.log("This means The function stopInstance1 is invoked");
    var params = {
        InstanceIds: [
            "i-04607009340d1e86b"
        ]
    };
    ec2.stopInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
            setTimeout(function () {
                detachInstance1();
            }, 120000)
        }
    });
}

function detachInstance1() {
    console.log("This means The function detachInstance1 is invoked");
    var params = {
        VolumeId: "vol-0226baecd3ab627f2"
    };
    ec2.detachVolume(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
            setTimeout(function () {
                stopInstance2();
            }, 120000)
        }
    });
}

function stopInstance2() {
    console.log("This means The function stopInstance2 is invoked");
    var params = {
        InstanceIds: [
            "i-05b3e312169fe8a9b"
        ]
    };
    ec2.stopInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
            setTimeout(function () {
                detachInstance2();
            }, 120000)
        }

    });
}

function detachInstance2() {
    console.log("This means The function detachInstance2 is invoked");
    var params = {
        VolumeId: "vol-0cbfd4637cbe90d82"
    };
    ec2.detachVolume(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
            setTimeout(function () {
                attachVolume2();
            }, 120000)
        }
    });
}

function attachVolume2() {
    console.log("This means The function attachVolume2 is invoked");
    var params = {
        Device: "/dev/sda1",
        InstanceId: "i-05b3e312169fe8a9b",
        VolumeId: "vol-0226baecd3ab627f2"
    };
    ec2.attachVolume(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(data);           // successful response
            setTimeout(function () {
                startInstance2();
            }, 120000)
        }
    });
}

function startInstance2() {
    console.log("This means The function startInstance2 is invoked");
    var params = {
        InstanceIds: [
            "i-05b3e312169fe8a9b"
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

module.exports.handler = startOperation;




/*
Scenario 1:
Pre-Requisite:
1) Create Instance i1 - v1 ( us-east-1a)
2) Create backup instance i2- v2 ( us-east-1a)


Error ( i1- Stopped)
1) i1- Stop
2) Detach v1 -> i1
3)  This means v1 is ready
4) i2- Stop
5) Detach v2 -> i2
6)  This means v2 is not used now
7) Attach i2-> v1
8) start i2


Scenario 2:
Pre-Requisite:
1) Create Instance i1 - v1
2) Create backup instance i2- v2
3) Stop i2
4) Detach v2

--------
i1, v1, i2

Error ( i1- Stopped)
1) i1- Stop
2) Detach v1 -> i1
3) Attach i2-> v1
4) start i2


*/