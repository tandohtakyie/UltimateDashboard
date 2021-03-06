
// const apiHost = "http://145.109.160.121:8085";
//const apiHost = "http://1804e5df.ngrok.io";
// const apiHost = "http://145.109.160.121:8085";
const apiHost = "http://c96cbb33.ngrok.io";


export default {
  getApiHost() {
    return apiHost.toString();
  },

  async getAllFeedbacks() {
    try {
      const response = await fetch(apiHost + "/get/time/desc");
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getFeedbackDetail(feedbackId) {
    try {
      const response = await fetch(apiHost + "/get/id/" + feedbackId);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getFeedbackToDeleteById(feedbackId) {
    try {
      const response = await fetch(
        apiHost + "/areyousure/delete/" + feedbackId
      );
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchFeedbacksFilteredResult(appName) {
    try {
      const response = await fetch(apiHost + "/get/FbByAppName/" + appName);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async getAppNames() {
    try {
      const response = await fetch(apiHost + "/get/apps");
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async getQuestionsAndAvg(app) {
    try {
      const response = await fetch(apiHost + '/getAvgRatingPerQuestPerApp/' + app);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

};
