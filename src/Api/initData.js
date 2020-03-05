const {host} = require('./hostname');

const initData = () => fetch(host).then(res => res.json());

module.exports = {
  initData: initData,
};
