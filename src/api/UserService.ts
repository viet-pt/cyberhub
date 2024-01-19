import { deleteRequest, getRequestShowLoading, postRequestShowLoading } from "./_http";

export const UserService = {
  login: function (data, successCallback, failCallback?: Function) {
    const URL = '/user/login/';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

  getUserInfo: function (data, successCallback, failCallback?: Function) {
    const URL = '/user/info/';
    return getRequestShowLoading(URL, data, successCallback, failCallback);
  },

  getHistory: function (data, successCallback, failCallback?: Function) {
    const URL = '/user/quiz_history/';
    return getRequestShowLoading(URL, data, successCallback, failCallback);
  },

  getSubscribeInfo: function (data, successCallback, failCallback?: Function) {
    const URL = '/post/subscribe/';
    return getRequestShowLoading(URL, data, successCallback, failCallback);
  },

  getQuizHistoryDetail: function (data, successCallback, failCallback?: Function) {
    const URL = `/user/quiz_history/${data.id}/`;
    return getRequestShowLoading(URL, data, successCallback, failCallback);
  },

  getDataChart: function (data, successCallback, failCallback?: Function) {
    const URL = `/user/quiz_history/chart/`;
    return getRequestShowLoading(URL, data, successCallback, failCallback);
  },

  subscribe: function (data, successCallback, failCallback?: Function) {
    const URL = '/post/subscribe/';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

  unSubscribe: function (data, successCallback, failCallback?: Function) {
    const URL = '/post/subscribe/';
    return deleteRequest(URL, data, successCallback, failCallback);
  },

}
