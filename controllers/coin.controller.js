const Coin = require('../models/coin.model');

exports.getCoinsPrice = (req, res, next) => {};
exports.getCoinPrice = (req, res, next) => {
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
      const str = element.id.S;
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
          Number(element.height_price.N),
          Number(element.lowest_price.N),
          Number(element.average_price.N),
          Number(element.start_price.N),
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
