module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/restaurants/cities/:city',
        handler: 'restaurant.getAllRestaurantByCity',
        config: {
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/restaurants/states/:state',
        handler: 'restaurant.getAllRestaurantByState',
        config: {
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/restaurants/state/count',
        handler: 'restaurant.getCountOfRestaurantByState',
        config: {
          auth: false
        },
      }
    ]
  };