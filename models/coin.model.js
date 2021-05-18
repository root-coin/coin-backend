var db = require('../common/db');

class Coin {
  constructor(coin) {
    this.coin_id = coin.coinId || '';
  }

  static read(coinId, resultCallback) {
    const key = {
      dataType: 'coin',
      find: 'coin_id',
      value: coinId,
    };
    db.find(key, (err, data) => {
      if (err) {
        resultCallback(err, null);
        return;
      }
      resultCallback(null, data);
    });
  }

  static create(data, resultCallback) {
    const datas = [];
    data.forEach((element) => {
      const el = {
        PutRequest: {
          Item: {
            start_price: { N: element.start_price },
            average_price: { N: element.average_price },
            height_price: { N: element.height_price },
            lowest_price: { N: element.lowest_price },
            total_amount: { N: element.total_amount },
            coin_id: { S: element.coin_id },
            id: { S: String(element.trade_time) },
            dataType: { S: 'coin' },
          },
        },
      };
      datas.push(el);
    });

    const params = {
      RequestItems: {
        coin: datas,
      },
    };
    db.batchCreate(params, (err, result) => {
      if (err) {
        resultCallback(err, null);
        return;
      }
      resultCallback(null, result);
    });
  }

  static readAll(resultCallback) {}
}

module.exports = Coin;
