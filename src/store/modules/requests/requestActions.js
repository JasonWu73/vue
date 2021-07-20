import axios from 'axios';

export default {
  async contactCoach(context, payload) {
    const coachId = payload.coachId;
    const request = {
      coachId,
      email: payload.email,
      message: payload.message
    };

    const response = await axios.post(
      `https://vue-htt-demo-51252-default-rtdb.firebaseio.com/requests/${coachId}.json`,
      request);

    request.id = response.data.name;

    context.commit('addRequest', request);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.getUserId;

    const response = await axios.get(
      `https://vue-htt-demo-51252-default-rtdb.firebaseio.com/requests/${coachId}.json`);

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
