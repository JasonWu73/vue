export default {
  async contactCoach(context, payload) {
    const coachId = payload.coachId;
    const request = {
      coachId,
      email: payload.email,
      message: payload.message
    };

    const axios = context.rootGetters.getAxios;
    const response = await axios.post(`requests/${coachId}.json`, request);

    request.id = response.data.name;

    context.commit('addRequest', request);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.getUserId;

    const axios = context.rootGetters.getAxios;
    const token = context.rootGetters.getToken;
    const response = await axios.get(`requests/${coachId}.json?auth=${token}`);

    const requests = [];
    const responseData = response.data;

    for (const key in responseData) {
      const request = {
        id: key,
        ...responseData[key]
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};
