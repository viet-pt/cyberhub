import { postRequestShowLoading } from "./_http";

export const UserService = {
  login: function (data, successCallback, failCallback?: Function) {
    const URL = '/account/login';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

}
