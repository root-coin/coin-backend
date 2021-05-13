const Coin = require('../models/coin.model');
const User = require('../models/user.model');

exports.getCoinsPrice = (req, res, next) => {
  Coin.reandAll((err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(data);
  });
};
exports.getCoinChart = (req, res, next) => {
  const { coinId } = req.params;
  Coin.read(coinId, (err, data) => {
    if (err) {
      res.status(500).send({ err });
      return;
    }
    console.log(data);
    const seriesData = [];
    const seriesDataLinear = [];
    data.forEach((element) => {
      const str = element.id.S.split('/')[1];
      const time1 =
        str.substring(0, 4) +
        '/' +
        str.substring(4, 6) +
        '/' +
        str.substring(6, 8) +
        ' ' +
        str.substring(8, 10) +
        ':' +
        str.substring(10, 12) +
        ':00';
      const price = {
        x: new Date(time1),
        y: [
          Number(element.start_price.N),
          Number(element.height_price.N),
          Number(element.lowest_price.N),
          Number(element.average_price.N),
        ],
      };
      const amount = {
        x: new Date(time1),
        y: Number(element.total_amount.N),
      };
      seriesData.push(price);
      seriesDataLinear.push(amount);
    });
    const result = {
      seriesData,
      seriesDataLinear,
    };
    res.status(200).send(result);
  });
};

exports.saveInfo = (req, res, next) => {
  const { data } = req.body;
  console.log(req.body);
  console.log(data);
  Coin.create(data, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.status(200).send(result);
  });
};

exports.buy = (req, res, next) => {
  const { coinId } = req.params;
  const { userId } = res.locals;
  const { quantity } = req.body;
  Coin.read(coinId, (err, data) => {
    if (err) {
      res.status(500).send({ err });
      return;
    }
    console.log(data);
    const needPoint = Number(data[0].average_price.N) * quantity;
    const coinData = {
      id: coinId,
      quantity,
      price: Number(data[0].average_price.N),
    };
    User.buy(userId, coinData, needPoint, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      if (result.status === 400) {
        res.status(400).send({ result: '포인트가 부족합니다.' });
        return;
      }
      res.status(200).send(result);
    });
  });
};
