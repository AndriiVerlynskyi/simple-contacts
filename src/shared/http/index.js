import axios from 'axios';
import { handleParams } from './handleParams';

const http = {
  get(url, allParams) {
    const params = handleParams(allParams);
    return axios({
      method: 'get',
      url,
      params,
    });
  },
  post(url, data, params) {
    return axios({
      method: 'post',
      url,
      data,
      params
    });
  },
  delete(url, params) {
    return axios({
      method: 'delete',
      url,
      data: params,
    });
  },
  put(url, params) {
    return axios({
      method: 'put',
      url,
      data: params,
    });
  }
};

export default http;
