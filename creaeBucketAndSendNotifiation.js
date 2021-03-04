var AWS = require('aws-sdk');   // Loading The Library
AWS.config.update({ region: 'ap-south-1' });  // Region Updated
var s3 = new AWS.S3();  // Loaded the library for S3
var sns = new AWS.SNS(); // Loaded the library for SNS


function initFunction() {
    createBucket();
}

function createBucket(){
var params = {
  Bucket: "bucketcreatedbylambdaon5march"
 };
 s3.createBucket(params, function(err, data) {
   if (err) 
   {
       console.log(err, err.stack); // an error occurred
       sendNotification("Bucket Creation Failed", "Bucket Creation Failed, Reason"+err.stack  );
   }
   else
   {
       console.log(data);           // successful response
       sendNotification("Bucket Creation Succesful", "Bucket "+params.Bucket + " Created Successfully ");
   }

 });
}

function sendNotification(subject, message){
    var params = {
  Message: message, /* required */
  Subject: subject,
  TopicArn: 'arn:aws:sns:ap-south-1:016124700666:s3Delivery'
};
sns.publish(params, function(err, data) {
  if (err) 
  {
      console.log(err, err.stack); // an error occurred
  }
  else 
  {
      console.log(data);           // successful response
  }
});
}

module.exports.handler = initFunction;
