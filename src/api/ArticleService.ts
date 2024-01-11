import { getRequest, getRequestShowLoading, getServerRequest, postRequestShowLoading } from "./_http";

function transformDestList(res) {
  if (res?.data?.length) {
    return res.data.map(item => ({
      id: item.id,
      name: item.attributes.name,
      countries: item.attributes.countries || []
    }))
  } else return null;
}

function transformSearch(res) {
  if (res?.dests || res?.countries) {
    let dests = res.dests.map(item => ({
      ...item.carousel,
      link: `/destination/${item.destination}`
    }))
    let countries = res.countries.map(item => ({
      ...item.carousel,
      link: `/country/${item.country}`
    }))
    return { dests, countries };
  }
  return res;
}

export const ArticleService = {
  getHeaders: async function () {
    const URL = '/headers';
    return await getServerRequest(URL);
  },

  getHome: async function () {
    const URL = '/home-page';
    return await getServerRequest(URL);
  },

  getBlogs: async function (data) {
    const URL = "/blog-page";
    return await getServerRequest(URL, data);
  },

  getUnique: async function () {
    const URL = '/unique-page';
    return await getServerRequest(URL);
  },

  getDestinations: async function (data) {
    const URL = '/destinations';
    const res = await getServerRequest(URL, data);
    return transformDestList(res);
  },

  search: function (data, successCallback, failCallback?: Function) {
    const URL = '/search';
    return getRequestShowLoading(URL, data, successCallback, failCallback, transformSearch);
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
