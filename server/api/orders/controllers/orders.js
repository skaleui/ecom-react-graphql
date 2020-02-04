'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")("sk_test_Dy6TA2KyY8Dbsujnow1ftcNt00FYkWLRIk");


module.exports = {


  create: async (ctx) => {
    const {address, amount, brews, postalCode, token, city} = ctx.request.body;

    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
      source: token
    });

    // Create order in database 
    // console.log(strapi.services);
    const order = await strapi.services.orders.create({
      user: ctx.state.user._id,
      address,
      amount,
      brews,
      postalCode,
      city
    });

    return order;
  }
};
