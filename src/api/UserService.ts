import { getRequest, postRequestShowLoading } from "./_http";

export const UserService = {
  login: function (data, successCallback, failCallback?: Function) {
    const URL = '/user/login/';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

  getUserInfo: function (data, successCallback, failCallback?: Function) {
    const URL = '/user/info/';
    return getRequest(URL, data, successCallback, failCallback);
  },

  getHistory: function (data, successCallback, failCallback?: Function) {
    const URL = '/user/quiz_history/';
    return getRequest(URL, data, successCallback, failCallback);
  },

  subscribe: function (data, successCallback, failCallback?: Function) {
    const URL = '/post/subscribe/';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

}
