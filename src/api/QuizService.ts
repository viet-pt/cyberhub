import { getRequestShowLoading, postRequestShowLoading } from "./_http";

export const QuizService = {
  getQuestionList: function (data, successCallback, failCallback?: Function) {
    const URL = `/question/question/public/`;
    return getRequestShowLoading(URL, data, successCallback, failCallback);
  },

  getCategory: function (data, successCallback, failCallback?: Function) {
    const URL = `/post/category/public/`;
    return getRequestShowLoading(URL, data, successCallback, failCallback);
  },

  submitTest: function (data, successCallback, failCallback?: Function) {
    const URL = '/question/question/submit/';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

}
