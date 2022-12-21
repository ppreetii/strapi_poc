"use strict";

/**
 * restaurant controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::restaurant.restaurant",
  ({ strapi }) => ({
    async getAllRestaurantByCity(ctx) {
      try {
        const { city } = ctx.params;
        const data = await strapi
          .service("api::restaurant.restaurant")
          .getAllRestaurantByCity(city);

        return data;
      } catch (error) {
        throw new Error(error.messsage);
      }
    },

    async getAllRestaurantByState(ctx) {
      try {
        const { state } = ctx.params;
        const data = await strapi
          .service("api::restaurant.restaurant")
          .getAllRestaurantByState(state);

        return data;
      } catch (error) {
        throw new Error(error.messsage);
      }
    },
    async getCountOfRestaurantByState(ctx) {

      const data = await strapi
        .service("api::restaurant.restaurant")
        .getCountOfRestaurantByState();

      return data;
    },
  })
);
