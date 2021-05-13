var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-2'});
var ddb = new AWS.DynamoDB();

exports.create = (item) => {
    var params = {
        TableName: 'coin',
        Item: item
    }

    console.log(params);

    ddb.putItem(params, function(err, data){
        if(err){
            console.log("Error", err);
            return 1;
        } else{
            console.log("Success", data);
            return 0;
        }
    });
}

exports.read = (item) => {
    var params = {
        TableName: 'coin',
        Key: item
    }

    ddb.getItem(params, function(err, data){
        if(err){
            console.log("Error", err);
            return 1;
        } else{
            console.log("Success", data.Item);
            return data.Item;
        }
    });
}

exports.delete = (item) => {
    var params = {
        TableName: 'coin',
        Key: item
    }

    ddb.deleteItem(params, function(err, data){
        if(err){
            console.log("Error", err);
        } else{
            console.log("Success", data);
        }
    });
}