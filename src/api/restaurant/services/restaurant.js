"use strict";
const qs = require("qs");
const restaurant = require("../controllers/restaurant");
/**
 * restaurant service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::restaurant.restaurant",
  ({ strapi }) => ({
    async getAllRestaurantByCity(city) {
      try {
        const restaurants = await strapi.entityService.findMany(
          "api::restaurant.restaurant",
          {
            fields: ["name", "city", "cuisine"],
            filters: {
              city: {
                $eqi: city,
              },
            },
            sort: { name: "ASC" },
            populate: ["state"],
          }
        );
        if (restaurants.length > 0) {
          return restaurants.map((restaurant) => {
            return {
              name: restaurant.name,
              city: restaurant.city,
              cuisine: restaurant.cuisine,
              state: restaurant.state.state,
            };
          });
        }
        return {
          message: `No restaurant found for ${city} city`,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async getAllRestaurantByState(stateName) {
      try {
        let restaurants = await strapi.entityService.findMany(
          "api::restaurant.restaurant",
          {
            fields: ["name", "city", "cuisine"],

            sort: { name: "ASC" },
            populate: ["state"],
          }
        );

        restaurants = restaurants.filter(
          (restaurant) =>
            restaurant.state.state.toLowerCase() === stateName.toLowerCase()
        );

        if (restaurants.length > 0) {
          return restaurants.map((restaurant) => {
            return {
              name: restaurant.name,
              city: restaurant.city,
              cuisine: restaurant.cuisine,
              state: restaurant.state.state,
            };
          });
        }

        return {
          message: `No restaurant found for ${stateName} state`,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async getCountOfRestaurantByState() {
      try {
        let restaurants = await strapi.entityService.findMany(
          "api::restaurant.restaurant",
          {
            fields: ["name", "city", "cuisine"],

            sort: { name: "ASC" },
            populate: ["state"],
          }
        );

        if (restaurants.length > 0) {
          let states =[...new Set(restaurants.map((restaurant) => restaurant.state.state))] ;
          let response = [];
          for (let stateObj of states) {
            let data = restaurants.filter(
              (restaurant) => restaurant.state.state === stateObj
            );

            response.push({
              count: data.length,
              state: stateObj,
            });
          }

          return {
            data: response,
          };
        }

        return {
          data: []
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  })
);
