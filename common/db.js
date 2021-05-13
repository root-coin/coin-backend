const AWS = require('aws-sdk');
AWS.config = {
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  region: 'ap-northeast-2',
};
const ddb = new AWS.DynamoDB();

exports.create = (item, resultCallback) => {
  const params = {
    TableName: 'coin',
    Item: item,
  };
  //console.log(params);
  ddb.putItem(params, function (err, data) {
    if (err) {
      resultCallback(err, null);
    } else {
      resultCallback(null, data);
    }
  });
};

exports.read = (item, resultCallback) => {
  const params = {
    TableName: 'coin',
    Key: item,
  };
  //console.log(params);
  ddb.getItem(params, function (err, data) {
    if (err) {
      resultCallback(err, null);
    } else {
      resultCallback(null, data.Item);
    }
  });
};

exports.delete = (item, resultCallback) => {
  const params = {
    TableName: 'coin',
    Key: item,
  };

  ddb.deleteItem(params, function (err, data) {
    if (err) {
      resultCallback(err, null);
    } else {
      resultCallback(null, data);
    }
  });
};

exports.find = (item, resultCallback) => {
  var params = {
    TableName: 'coin',
    KeyConditionExpression: 'dataType = :d',
    FilterExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': item.find,
    },
    ExpressionAttributeValues: {
      ':d': { S: item.dataType },
      ':id': { S: item.value },
    },
  };
  console.log(params);
  ddb.query(params, (err, data) => {
    if (err) {
      resultCallback(err, null);
      return;
    }
    resultCallback(null, data.Items);
  });
};
