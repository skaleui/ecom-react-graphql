// @description Actions for emails plugin

module.exports = {

  send: async (ctx) => {

    const config = await strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'email'

    }).get({ key: 'provider'});


    if(config.enabled === false) {
      strapi.log.error('Email is disabled');
      return ctx.badRequest(null, ctx.request.admin ? [{ messages:[{ id: 'Email status disabled'}]}] : 'Emails disabled');
    }

    if(ctx.status === 400) {
      console.log('Status 400');
      return;
    }

    let options = ctx.request.body;

    // await strapi.plugins.email.services.send(options, config);
    try {
      await strapi.plugins['email'].services.email.send({
        to: options.to,
        from: 'skale.safe@gmail.com',
        subject: options.subject,
        text: options.text,
        html: options.html
      })

    } catch (err) {
      console.log(err);
      return ctx.badRequest(null, err);
    }

    ctx.send({});
  }

}