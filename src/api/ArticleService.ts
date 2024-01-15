import { HOT_NEWS } from "utils/constants";
import { getRequest, getServerRequest, postRequestShowLoading } from "./_http";

export const ArticleService = {
  getAricleDetail: async function (data) {
    const URL = `/detail`;
    // const res = await getServerRequest(URL, data);
    // return res;
    return HOT_NEWS[0];
  },

  getRelateList: async function (data) {
    const URL = `/relate`;
    // const res = await getServerRequest(URL, data);
    // return res;
    return HOT_NEWS;
  },

  search: async function (data) {
    const URL = `/detail`;
    const res = await getServerRequest(URL, data);
    return res;
  },

  getMyContact: function (successCallback, failCallback?: Function) {
    const URL = '/my-contact?populate=deep';
    return getRequest(URL, {}, successCallback, failCallback);
  },

  submitNewLetter: function (data, successCallback, failCallback?: Function) {
    const URL = '/new-letters';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },
}
