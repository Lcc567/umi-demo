import axios from 'axios';

class Api {
  constructor() {
    this.baseURL =
      process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000';
    // this.timeout = 3000;
    this.queue = {};
  }

  interceptors(instance, url) {
    // Add a request interceptor
    instance.interceptors.request.use(
      config => {
        if (Object.keys(this.queue).length === 0) {
        }
        this.queue[url] = url;

        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    instance.interceptors.response.use(
      response => {
        delete this.queue[url];

        return response.data;
      },
      function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );
  }

  request(options) {
    let instance = axios.create();
    let config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
    };
    this.interceptors(instance, options.url);

    return instance(config);
  }

  get(options) {
    this.request({
      ...options,
      method: 'get',
    });
  }
}

export default new Api();

// api.request({
//     baseURL: '/',
//     method: 'get'
// })
