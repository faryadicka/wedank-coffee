import process = require("process");

const midtransClient = require('midtrans-client');
const { MIDTRANS_SERVEY_KEY, MIDTRANS_CLIENT_KEY } = process.env


const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: MIDTRANS_SERVEY_KEY,
  clientKey: MIDTRANS_CLIENT_KEY
});

// const snap = new midtransClient.Snap({
//   isProduction: false,
//   serverKey: MIDTRANS_SERVEY_KEY,
//   clientKey: MIDTRANS_CLIENT_KEY
// });

module.exports = { coreApi }