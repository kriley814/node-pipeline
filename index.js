const AWS = require('aws-sdk');
const fs = require('fs');

var myArgs = process.argv.slice(2);
console.log('myArgs[0]: ', myArgs[0]);

var message_str=myArgs[0];
console.log('message_str before replace: ', message_str);
var obj = JSON.parse(message_str);
var new_obj = obj.Message;
console.log('New object: ', new_obj);
var json_new_obj = JSON.parse(new_obj);
console.log('JSON NEW OBJ: ', json_new_obj);
const bucketName = json_new_obj.Records[0].s3.bucket.name;
console.log('Bucket name: ', bucketName);
const key = json_new_obj.Records[0].s3.object.key
console.log('Key: ', key);

const filePath = './downloaded.json';
var s3 = new AWS.S3();

const downloadFile = (filePath, bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  s3.getObject(params, (err, data) => {
    if (err) console.error(err);
    fs.writeFileSync(filePath, data.Body.toString());
    console.log(`${filePath} has been created!`);
  });
};

downloadFile(filePath, bucketName, key); 

fs.readFile('./downloaded.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const trainingInfra = JSON.parse(jsonString)
        console.log("Order ID is: ", trainingInfra.Name) 
        console.log("First name is: ", trainingInfra.First_Name__c)
        console.log("Last name is: ", trainingInfra.Last_Name__c)
        console.log("Order date is: ", Order_Date__c)
        conosle.log("Course title is: ", Course_Title__c)
} catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})

