const express = require('express');
const router = express.Router();
const braintree = require('braintree');

router.post('/', (req, res, next) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: '2294h86fxgshsvhy',
    publicKey: 'jz5wtyzpzj3shnsb',
    privateKey: 'dcef90c9bf3c9c03e6609ee5d10021f2'
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: "10.00",
    orderId: "order id",
    merchantAccountId: "aMerchantAccountId",
    paymentMethodNonce: nonceFromTheClient,
    deviceData: deviceDataFromTheClient,
    customer: {
      firstName: "Drew",
      lastName: "Smith",
      company: "Braintree",
      phone: "312-555-1234",
      fax: "312-555-12346",
      website: "http://www.example.com",
      email: "drew@example.com"
    },
    billing: {
      firstName: "Paul",
      lastName: "Smith",
      company: "Braintree",
      streetAddress: "1 E Main St",
      extendedAddress: "Suite 403",
      locality: "Chicago",
      region: "IL",
      postalCode: "60622",
      countryCodeAlpha2: "US"
    },
    shipping: {
      firstName: "Jen",
      lastName: "Smith",
      company: "Braintree",
      streetAddress: "1 E 1st St",
      extendedAddress: "5th Floor",
      locality: "Bartlett",
      region: "IL",
      postalCode: "60103",
      countryCodeAlpha2: "US"
    },
    options: {
      submitForSettlement: true
    },
  }, (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;