const { coreApi: core } = require('../configs/midtrans')

const chargerMidtrans = async (type: any, orderId: any, amount: any, name: any, address: any, phone: string, bank?: any, countryId?: string, acquirer?: string, cardNumber?: any, cardExpMonth?: any, cardExpYear?: any, cardCvv?: any) => {
  let parameter: any = {
    "payment_type": type,
    "transaction_details": {
      "order_id": orderId,
      "gross_amount": amount
    },
    "name": name,
    "address": address,
    "phone_number": phone,
  }

  if (type === "bank_transfer") {
    parameter = {
      ...parameter, "bank_transfer": {
        "bank": bank,
      }
    }
  }

  if (type === "gopay") {
    parameter = {
      ...parameter, "gopay_partner": {
        "phone_number": phone.slice(1),
        "country_code": countryId,
        "redirect_url": "https://www.gojek.com"
      },
    }
  }

  if (type === "qris") {
    parameter = {
      ...parameter,
      "qris": {
        "acquirer": acquirer
      }
    }
  }

  if (type === "shopeepay") {
    parameter = {
      ...parameter, "shopeepay": {
        "callback_url": "https://midtrans.com/"
      }
    }
  }

  if (type === "credit_card") {
    let parameterToken = {
      "card_number": cardNumber,
      "card_exp_month": cardExpMonth,
      "card_exp_year": cardExpYear,
      "card_cvv": cardCvv,
      "client_key": core.apiConfig.clientKey,
    };
    try {
      const response = await core.cardToken(parameterToken)
      const token = response.token_id
      parameter = {
        ...parameter,
        "credit_card": {
          "token_id": token,
          "bank": bank,
          "save_token_id": true
        }
      };
      return core.charge(parameter);
    } catch (error: any) {
      return error.message
    }
    // core.cardToken(parameterToken)
    //   .then((cardTokenResponse: any) => {
    //     let cardToken = cardTokenResponse.token_id;
    //     parameter = {
    //       ...parameter,
    //       "credit_card": {
    //         "token_id": cardToken,
    //         "bank": "bni",
    //         "installment_term": 6,
    //         "bins": ["4811", "5233"],
    //         "type": "authorize",
    //         "save_token_id": true
    //       }
    //     };
    //     return core.charge(parameter);
    //   }).catch((err: any) => {
    //     console.log(err.message)
    //   })
  }
  return core.charge(parameter);
}

module.exports = { chargerMidtrans }