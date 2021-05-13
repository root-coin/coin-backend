var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-2'});
var ddb = new AWS.DynamoDB();

exports.create = (item, resultCallback) => {
    var params = {
        TableName: 'coin',
        Item: item
    }

    console.log(params);

    ddb.putItem(params, function(err, data){
        if(err){
            console.log("Error", err);
            resultCallback(err, data);
        } else{
            console.log("Success", data);
            resultCallback(null, data);
        }
    });
}

exports.read = (item, resultCallback) => {
    var params = {
        TableName: 'coin',
        Key: item
    }

    ddb.getItem(params, function(err, data){
        if(err){
            console.log("Error", err);
            resultCallback(err, data);
        } else{
            console.log("Success", data.Item);
            resultCallback(null, data);
        }
    });
}

exports.delete = (item, resultCallback) => {
    var params = {
        TableName: 'coin',
        Key: item
    }

    ddb.deleteItem(params, function(err, data){
        if(err){
            resultCallback(err, data);
        } else{
            resultCallback(null, data);
        }
    });
}