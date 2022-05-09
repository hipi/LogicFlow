import http from './http.js';

import { getBrick } from "./data.js";
import { getError } from './utils.js';
import { ERROR_NETWORK } from '../constant/ErrorNo.js';

let baseUrl = '/formManage';

export const setBaseUrl = (url) => {
  baseUrl = url;
}

/**
 * 获取当前设计器应用的组件列表
 */
export const getFormBrick = (formType) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: getBrick(formType)
      });
    });
  });
}

export const getFormDetail = (data) => {
  const url = baseUrl + '/form/getFormDetail';
  return new Promise((resolve, reject) => {
    http(url, {
      method: 'get',
      params: data
    }).then(({ data }) => {
      resolve(data);
    }).catch((e) => {
      reject(getError({
        errorNo: ERROR_NETWORK.GET_FORM_ERROR,
        message: e.message,
        url
      }));
    });
  });
}

export const saveForm = (data) => {
  const url = baseUrl + '/form/save';
  return new Promise((resolve, reject) => {
    http(url, {
      method: 'post',
      data
    }).then(({ data }) => {
      resolve(data);
    }).catch((e) => {
      reject(getError({
        errorNo: ERROR_NETWORK.GET_FORM_ERROR,
        message: e.message,
        url
      }));
    });
  });
}
/**
 * 执行资源引擎API
 */
export const executeApi = (data) => {
  const url = baseUrl + '/resource/executeApi';
  return new Promise((resolve, reject) => {
    http(url, {
      method: 'post',
      data
    }).then(({ data }) => {
      resolve(data);
    }).catch((e) => {
      reject(e);
    })
  });
}

export const queryInfo = (data) => {
  const url = baseUrl + '/resource/queryAllsparkField';
  return new Promise((resolve, reject) => {
    http(url, {
      method: 'get',
      params: data
    }).then(({ data }) => {
      resolve(data);
    }).catch((e) => {
      reject(e);
    })
  });
}

// 获取列表属性
export const getListProperties = (data) => {
  const url = baseUrl + '/resource/getListProperties';
  return new Promise((resolve, reject) => {
    http(url, {
      method: 'get',
      params: data
    }).then(({ data }) => {
      resolve(data);
    }).catch((e) => {
      reject(e);
    })
  });
}

