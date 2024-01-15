import { getRequestShowLoading, postRequestShowLoading } from "./_http";

export const QuizService = {
  getQuestionList: function (data, successCallback, failCallback?: Function) {
    const URL = `/question/question/public/`;
    return getRequestShowLoading(URL, data, successCallback, failCallback);
  },

  subscribe: function (data, successCallback, failCallback?: Function) {
    const URL = '/question/question/submit/';
    return postRequestShowLoading(URL, data, {}, successCallback, failCallback);
  },

}
