import { HOT_NEWS } from "utils/constants";
import { getServerRequest, postRequestShowLoading } from "./_http";

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

  getNewsByCate: async function (data) {
    const URL = `/post/post/public_by_category/`;
    const res = await getServerRequest(URL, data);
    return res;
  },

  getNewsList: async function (data) {
    const URL = `/post/post/public/`;
    const res = await getServerRequest(URL, data);
    return res;
  },

  getCategory: async function (data) {
    const URL = `/post/category/`;
    const res = await getServerRequest(URL, data);
    return res;
  },

  getNewsDetail: async function (id) {
    const URL = `/post/post/public/${id}/`;
    const res = await getServerRequest(URL, {});
    return res;
  },

  search: async function (data) {
    const URL = `/detail`;
    const res = await getServerRequest(URL, data);
    return res;
  },

  submitNewLetter: function (data, successCallback, failCallback?: Function) {
    const URL = '/new-letters';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },
}
