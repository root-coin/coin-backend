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
    const d = {
      start_price: { N: data.start_price },
      average_price: { N: data.average_price },
      height_price: { N: data.height_price },
      lowest_price: { N: data.lowest_price },
      total_amount: { N: data.total_amount },
      coin_id: { S: data.coin_id },
      id: { S: String(data.trade_time) },
      dataType: { S: 'coin' },
    };
    db.create(d, (err, result) => {
      if (err) {
        resultCallback(err, null);
        return;
      }
      resultCallback(null, result);
    });
  }
}

module.exports = Coin;
