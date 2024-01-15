import { getServerRequest } from "./_http";

export const ArticleService = {
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
}
