import * as Stripe from "stripe";
import { response } from "../utils";
import { ClientError } from "../utils/errors";
//require('dotenv').config();
const UserModel = require('../models/user.model'); //por si hay que hacer que cambie algun estado del usuario que compró algo
const stripe_secret_key: string = process.env.STRIPE_SECRET_KEY;//se obtiene de stripe la página, luego de el registro completo, el modo dev no requiere de registro completo.
const STRIPE_WEBHOOK_SECRET: string = process.env.STRIPE_WEBHOOK_SECRET; // se obtiene de: https://stripe.com/docs/stripe-cli
const STRIPE_PUBLISHABLE_KEY: string = process.env.STRIPE_PUBLISHABLE_KEY

interface input extends Express.Request {
  headers,
  body,
  params,
  query,
  user: { userId, email }
}

type ShippingData = {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
      state: string;
    };
    tracking_number: string;
    name: string;
    phone: string;
};



const stripe = new Stripe.Stripe(stripe_secret_key, null);


export async function saveCreditCard(req: input, res) {
  const {token} =req.body
  if(!token) throw new ClientError("token no se envio",400)
  const user = await UserModel.findById(req.user.userId);
  user.stripe.creditCardTokens.push(token)
  await user.save()
  response(res, 200, "saved credit card");
}

export async function processPurchase(req: input, res) {

  //--------------------------------------------------------------
  //Validaciones / Sanitización rápida
  let { shippingAdress,  productId } = req.body;
  if (!shippingAdress) throw new ClientError('Debes enviar shippingAdress', 400);
  if(!productId) throw new ClientError('Debes enviar productId', 400);

  const user = await UserModel.findById(req.user.userId)
  if (!user || !user.email) throw new ClientError("El usuario no existe " + user, 500)
  //const dir: ShippingData = user.shippingaddresss
  //if (!(dir.name && dir.address.city && dir.address.country && dir.address.line1)) throw new ClientError("Usted no tiene agregada una dirección de entrega de producto.", 500)

  //--------------------------------------------------------------
  //Crea un cliente si no existe 
  let customer
  if(user.stripe.customer && user.stripe.customer.length>1){
    customer=user.stripe.customer
    console.log("usuario viejo");
    
  }else{
    const customerData = await stripe.customers.create(
      {
        email: user.email,
      })
      console.log("usuario nuevo");
      user.stripe.customer = customerData.id;
      await user.save();
  }
  console.log(customer);
  
  
  //--------------------------------------------------------------
  // Obtiene clave efímera, sea lo que sea eso.
  const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer },
    { apiVersion: '2022-11-15' })


  //--------------------------------------------------------------
  //Con los datos q enviamos a stripe se procesan y stripe nos devuelve datos X
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer,
    amount: Math.round(14.99 * 100),
    currency: 'EUR',
    payment_method_types: ['card'],
    metadata: {
      amount: Math.round(14.99 * 100),
    },
    shipping:{ address: { city: 'Madrid', country: 'ES', line1: 'Chingo', line2: 'Gorda', postal_code: '538', state: 'Madrid' }, tracking_number : '21321', name: 'Haahah', phone: '646464646' }
  });

  const clientSecret = paymentIntent.client_secret;

  response(res, 200, { ephemeralKey, clientSecret, customer: customer });
}

export async function getApiKey(req, res) {
  if (!STRIPE_PUBLISHABLE_KEY) throw new ClientError("STRIPE_PUBLISHABLE_KEY no existe en las variables de entorno", 500);
  response(res, 200, STRIPE_PUBLISHABLE_KEY)
}

// Stripe va llamando a esta ruta con "eventos", cada evento es diferente
// y pueden ser eventos de diferente compras concurrentes, pero cada
// evento contiene informacion suficiente para determinar a quien le pertenece
// la compra, y algun METADATA
// y lo manejamos dentro de un switch case.
export async function stripeCallback(req, res) {
  const sig = req.headers['stripe-signature'];
  let event: Stripe.Stripe.Event;
  // Check if the event is sent from Stripe or a third party
  // And parse the event

  event = await stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);

  // Event when a payment is initiated
  if (event.type === 'payment_intent.created') {
    console.log(`${JSON.stringify(event.data.object)} initated payment!`);
    // Si el valor de lo que quiere pagar no coincide con su precio real, no aceptar el pago!!!
    // event.data.object.metadata
  }
  // Event when a payment is succeeded
  if (event.type === 'payment_intent.succeeded') {
    // fulfilment
  }

  // Manejar el tipo de evento
  switch (event.type) {
    case 'charge.refunded':
      const chargeRefunded = event.data.object;
      // Si el usuario que compró, le dijo a stripe que se arrepiente, aqui
      // deberiamos de enviar una notificación al dueño del producto que no lo envíe
      // ya que el comprador cancelo la compra.
      break;
    case 'charge.succeeded':
      const chargeSucceeded = event.data.object;
      // Cuando a un usuario que compro algo, se le quita el dinero de su cuenta y se transfirio
      // exitosamente a la cuenta maestra de esta API.
      break;
    case 'payment_intent.canceled':
      const paymentIntentCanceled = event.data.object;
      // Then define and call a function to handle the event payment_intent.canceled
      break;
    case 'payment_intent.created':
      const paymentIntentCreated = event.data.object;
      console.log(`payment_intent.created ${JSON.stringify(event.data.object)} initated payment!`);
      //Ocurre cuando un usuario oprime el boton "BUY"

      break;

    case 'payment_intent.payment_failed':
      const paymentIntentPaymentFailed = event.data.object;
      // Cuando algo en el proceso falló
      break;
    case 'payment_intent.processing':
      const paymentIntentProcessing = event.data.object;
      // Then define and call a function to handle the event payment_intent.processing
      break;
    case 'payment_intent.requires_action':
      const paymentIntentRequiresAction = event.data.object;
      // Then define and call a function to handle the event payment_intent.requires_action
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(`payment_intent.succeeded: ${JSON.stringify(event.data.object)} succeeded payment!`);
      // Se podria hacer que envíe un email al Dueño de la cuenta de stripe diciendole que tiene que
      // enviar un producto que le acaban de comprar.
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ ok: true }); //?NO TOCAR NUNCA??, Creo que stripe depende de esta respuesta.
}

