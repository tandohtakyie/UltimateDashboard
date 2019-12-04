// const apiHost = "http://192.168.43.95:8085";
// const apiHost = "http://10.24.24.206:8085";
// http://5f7d4964.ngrok.io/
const apiHost = "http://5f7d4964.ngrok.io";

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
      const response = await fetch(apiHost + "/id/" + feedbackId);
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
  }
};
