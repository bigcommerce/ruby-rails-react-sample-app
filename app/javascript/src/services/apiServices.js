const axios = require('axios');

export const ApiService = {
  getStoreInfo(params) {
    return axios({
      method: 'get',
      url: '/api/store_details',
      params,
    });
  },

  getOrders(params) {
    return axios({
      method: 'get',
      url: '/api/orders',
      params,
    });
  },

  updateOrder(params) {
    return axios({
      method: 'put',
      url: '/api/update_order',
      params,
    });
  },

  deleteOrder(params) {
    return axios({
      method: 'delete',
      url: '/api/delete_order',
      params,
    });
  },
};
