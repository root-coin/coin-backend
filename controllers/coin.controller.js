const Coin = require('../models/coin.model');

exports.getCoinPrice = (req, res, next) => {};
exports.getCoinsPrice = (req, res, next) => {
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
      const price = {
        x: element.id,
        y: [
          element.height_price,
          element.lowest_price,
          element.average_price,
          element.start_price,
        ],
      };
      const amount = {
        x: element.id,
        y: element.trade_amount,
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
  Coin.create(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(result);
  });
};
