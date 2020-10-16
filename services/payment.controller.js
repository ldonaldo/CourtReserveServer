const EventEmiter = require("events");
let epayco = require('epayco-sdk-node')({
  apiKey: 'e8a46a9b09d25dc32e84bc63e4792b88',
  privateKey: '2ea47a70a23ecdfe0513feb77d91bff9',
  lang: 'ES',
  test: true
})  

class PaymentService extends EventEmiter {
  
  createToken = async (req,res) => {
    try {
      console.log("executed endpoint")
      let credit_info = {
        "card[number]": "4575623182290326",
        "card[exp_year]": "2025",
        "card[exp_month]": "12",
        "card[cvc]": "123"
      }
      let token = await epayco.token.create(credit_info)
      console.log(token)
      let customer_info = {
        token_card: "zP4qNGzMoqfAEaiks",
        name: "Donaldo",
        last_name: "Llanos", 
        email: "donaldollanos96@gmail.com",
        default: true,
        city: "Barranquilla",
        address: "Calle 80# 43-78",
        phone: "3005234321",
        cell_phone: "3023094339"    
      }
      let customer = await epayco.customers.create(customer_info)
      console.log(customer)
      res.status(201).json({token, customer})
    } catch (err){
      res.status(400).json(err)
    }
  }
  payReserve = async (req, res) => {
    const {doc_number, name, last_name, email, city, address, cell_phone, description, value, dues} = req.body
    try {
      const payment_info = {
        token_card: "zP4qNGzMoqfAEaiks",
        customer_id: "NkydQwB5ZkSwFuQw5",
        doc_type: "CC",
        doc_number,
        name,
        last_name,
        email,
        city,
        address,
        phone: "3000065",
        cell_phone,
        bill: "CR-0001",
        description,
        value,
        tax: "0",
        tax_base: "0",
        currency: "COP",
        dues,
        ip:"192.168.1.8", 
        url_response: "localhost:19006",
        url_confirmation: "localhost:19006",
        method_confirmation: "GET",       
        use_default_card_customer: true,       
        extras: {
            extra1: "hola",
            extra2: "bb",
            extra3: "que",
            extra4: "mas",
            extra5: "pues",
            extra6: "!"
        }
      };
      const payment = await epayco.charge.create(payment_info)
      console.log(payment)
      res.status(200).json({payment})
    } catch(err){
      res.status(400).json(err.message)  
    } 
  }
}

const paymentService = new PaymentService();
module.exports = paymentService