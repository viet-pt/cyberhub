import { postRequestShowLoading } from "./_http";

export const UserService = {
  login: function (data, successCallback, failCallback?: Function) {
    const URL = '/user/login/';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

  subscribe: function (data, successCallback, failCallback?: Function) {
    const URL = '/post/subscribe/';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

}
