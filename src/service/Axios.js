import axios from "axios";
import { mapKeys, mapValues, camelCase, snakeCase } from "lodash";
import { TokenService } from "@/service/Storage.Service.js"
import store from '@/store'

const { VUE_APP_BASE_URL } = process.env

function getAccessToken() {
  // @todo: load access token from cookie or locale storage
  return TokenService.getToken();
}

function getFcm() {
  // @todo: load access token from cookie or locale storage
  return TokenService.getFCMToken();
}

function transformKeys(data, iteratee) {
  if (Array.isArray(data)) {
    return data.map((d) => transformKeys(d, iteratee));
  }

  if (data instanceof Object) {
    return mapValues(
      mapKeys(data, (_, k) => iteratee(k)),
      (v) => transformKeys(v, iteratee)
    );
  }

  return data;
}

export function camelCaseKeys(data) {
  return transformKeys(data, camelCase);
}

export function snakeCaseKeys(data) {
  return transformKeys(data, snakeCase);
}

// @see: https://github.com/mzabriskie/axios#axios-api
export function request(method, url, config = {}, options = {}) {
  const {
    params,
    data,
    headers,
    maxContentLength
  } = config;

  // non-axios specific params
  const {
    suppressAuth
  } = options;

  const baseURL = VUE_APP_BASE_URL;

  // @see: https://tools.ietf.org/html/rfc6750
  const bearerToken = `Bearer ${getAccessToken()}`;

  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
  
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // console.log(error.response.data);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response) {
        if (error.response.data.status == 401) {
          store.state.dialogAuthAlert = true
          store.state.process.run = false
          store.state.networkStatus = "401"
          store.state.ContentText = error.response.data.message
          // store.state.user = {}
          // store.state.token = ""
          // store.state.authenticated = false

          // TokenService.removeToken()

          return;
        } else if (error.response.data.status == 404) {
          // If request 404 (notfound)
          store.state.dialogAuthAlert = true
          store.state.process.run = false
          store.state.networkStatus = "404"
          store.state.ContentText = error.response.data.message
          store.state.ContentValidation = error.response.data.validation

          return;
        } else if (error.response.data.status == 400) {
          // console.log(error.response.data.validation);
          // If request 400 (failed)
          store.state.dialogAuthAlert = true
          store.state.process.run = false
          store.state.networkStatus = "400"
          store.state.ContentText = error.response.data.message
          store.state.ContentValidation = error.response.data.validation

          return;
        } else {
          // Handle if status outside 401, and 404
          store.state.dialogAuthAlert = true
          store.state.process.run = false
          store.state.networkStatus = "anyStatus"
          store.state.ContentText = "Terkendala masalah koneksi. Silahkan periksa koneksi internet Anda."

          return;
        }
      } else {
        store.state.dialogAuthAlert = true
        store.state.process.run = false
        store.state.networkStatus = "anyStatus"
        store.state.ContentText = error.response.data.message
        store.state.ContentValidation = error.response.data.validation

        return;
      }
    }
  );

  return new Promise((resolve, reject) => {
    axios({
      method,
      baseURL,
      url,
      params,
      data: data,
      headers: { Authorization: bearerToken, "Content-Type": "application/json" },
      maxContentLength
    })
      .then((response) => {
        resolve({
          ...response,
          data: response.data
        });
      })
      .catch(reject);
  });
}

export function requestUpload(method, url, config = {}, options = {}) {
  const {
    params,
    data,
    headers,
    maxContentLength
  } = config;

  // non-axios specific params
  const {
    suppressAuth
  } = options;

  const baseURL = VUE_APP_BASE_URL;
  // const xauth = `Basic ${VUE_APP_ACCESS_KEY}` ;

  // @see: https://tools.ietf.org/html/rfc6750
  // const bearerToken = `Bearer ${getAccessToken()}`;
  const bearerToken = `Bearer ${getAccessToken()}`;

  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
  
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // console.log(error.response);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response) {
        if (error.response.status == 401) {
          store.state.dialogAuthAlert = true
          store.state.networkStatus = "401"
          store.state.user = {}
          store.state.token = ""
          store.state.serial = ""
          store.state.authenticated = false

          TokenService.removeToken()

          return;
        } else if (error.response.status == 404) {
          // If request 404 (notfound)
          store.state.dialogAuthAlert = true
          store.state.networkStatus = "404"

          return;
        } 
        else if (error.response.status == 400) {
          // If request 400 (failed)
          store.state.dialogAuthAlert = true
          store.state.process.run = false
          store.state.networkStatus = "400"

          return;
        } else {
          // Handle if status outside 401, and 404
          store.state.dialogAuthAlert = true
          store.state.networkStatus = "anyStatus"

          return;
        }
      } else {
        store.state.dialogAuthAlert = true
        store.state.networkStatus = "anyStatus"

        return;
      }
    }
  );

  return new Promise((resolve, reject) => {
    axios({
      method,
      baseURL,
      url,
      params,
      data: data,
      // headers: suppressAuth ? headers : { ...headers, Authorization: bearerToken, "x-api-key": xauth, "Content-Type": "application/x-www-form-urlencoded" },
      // headers: suppressAuth ? headers : { ...headers, Token: bearerToken, "Content-Type": "application/json" },
      headers: { Authorization: bearerToken, "Content-Type": "multipart/form-data" },
      maxContentLength
    })
      .then((response) => {
        resolve({
          ...response,
          data: response.data
        });
      })
      .catch(reject);
  });
}

export function requestMedia(method, url, config = {}, options = {}) {
  const {
    params,
    data,
    headers,
    maxContentLength
  } = config;

  // non-axios specific params
  const {
    suppressAuth
  } = options;

  const baseURL = VUE_APP_BASE_URL;
  // const xauth = `Basic ${VUE_APP_ACCESS_KEY}` ;

  // @see: https://tools.ietf.org/html/rfc6750
  // const bearerToken = `Bearer ${getAccessToken()}`;
  const bearerToken = `Bearer ${getAccessToken()}`;

  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
  
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // console.log(error.response);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response) {
        if (error.response.status == 401) {
          store.state.dialogAuthAlert = true
          store.state.networkStatus = "401"
          store.state.user = {}
          store.state.token = ""
          store.state.serial = ""
          store.state.authenticated = false

          TokenService.removeToken()

          return;
        } else if (error.response.status == 404) {
          // If request 404 (notfound)
          store.state.dialogAuthAlert = true
          store.state.networkStatus = "404"

          return;
        } 
        else if (error.response.status == 400) {
          // If request 400 (failed)
          store.state.dialogAuthAlert = true
          store.state.process.run = false
          store.state.networkStatus = "400"

          return;
        } else {
          // Handle if status outside 401, and 404
          store.state.dialogAuthAlert = true
          store.state.networkStatus = "anyStatus"

          return;
        }
      } else {
        store.state.dialogAuthAlert = true
        store.state.networkStatus = "anyStatus"

        return;
      }
    }
  );

  return new Promise((resolve, reject) => {
    axios({
      method,
      baseURL,
      url,
      params,
      data: data,
      // headers: suppressAuth ? headers : { ...headers, Authorization: bearerToken, "x-api-key": xauth, "Content-Type": "application/x-www-form-urlencoded" },
      // headers: suppressAuth ? headers : { ...headers, Token: bearerToken, "Content-Type": "application/json" },
      headers: { Authorization: bearerToken },
      maxContentLength
    })
      .then((response) => {
        resolve({
          ...response,
          data: response.data
        });
      })
      .catch(reject);
  });
}

export function exportExcel(method,url,config,options){
  const {
    params,
    data,
    headers,
    maxContentLength
  } = config;

  // non-axios specific params
  // const {
  //   suppressAuth
  // } = options;

  const baseURL = VUE_APP_BASE_URL;
  const xauth = `Basic ${VUE_APP_XAUTH}` ;

  // @see: https://tools.ietf.org/html/rfc6750
  const bearerToken = `Bearer ${getAccessToken()}`;

  return new Promise((resolve, reject) => {
    axios({
      method,
      baseURL,
      url,
      responseType: 'blob',
      params,
      data: data,
      headers: {...headers, token: bearerToken, Authorization: xauth, serial:accessCode },
      maxContentLength
    })
      .then((response) => {
        resolve({
          ...response,
          data: response.data
        });
      }).catch(error => {
        if (error.response) {
          let errorData = error.response.data;
          let errorCode = error.response.status;
          let errorHeader = error.response.headers;

          if(error.response.status === 400){
            store.state.is_trial = true
            store.state.loading = false
          }

          if (errorCode === 401) {
            store.state.unauthorization = true
            store.state.loading = false
          }
        }else{
          store.state.errorNetwork = true
          store.state.loading = false
          reject(error)
        }
      });
  });
}

export function get(url, config, options) {
  return request("GET", url, config, options);
}

export function post(url, config, options) {
  return request("POST", url, config, options);
}

export function put(url, config, options) {
  return request("PUT", url, config, options);
}

export function patch(url, config, options) {
  return request("PATCH", url, config, options);
}


// not "delete()" because of reserved word
export function destroy(url, config, options) {
  return request("DELETE", url, config, options);
}

export function upload(url, config, options) {
  return requestUpload("POST", url, config, options);
}

export function get_media(url, config, options) {
  return requestMedia("GET", url, config, options);
}

export function destroy_media(url, config, options) {
  return requestMedia("DELETE", url, config, options);
}

