// path: ./src/extensions/some-plugin-to-extend/strapi-server.js

module.exports = (plugin) => {
  // Create the new controller
  plugin.controllers.auth.register = async (ctx) => {
    const { email } = ctx.request.body;

    return {
      success: "hey welcome",
      email,
    };
  };

  return plugin;
};
