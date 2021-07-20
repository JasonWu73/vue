import axios from 'axios';

export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.getUserId;
    const coach = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    await axios.put(
      `https://vue-htt-demo-51252-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      coach);

    context.commit('addCoach', {
      ...coach,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    const { forceUpdate } = payload;
    if (!forceUpdate && !context.getters.shouldUpdate) return;

    const response = await axios.get(
      `https://vue-htt-demo-51252-default-rtdb.firebaseio.com/coaches.json`);

    const coaches = [];
    const coachesFromServer = response.data;

    for (const key in coachesFromServer) {
      const coach = {
        id: key,
        firstName: coachesFromServer[key].firstName,
        lastName: coachesFromServer[key].lastName,
        description: coachesFromServer[key].description,
        hourlyRate: coachesFromServer[key].hourlyRate,
        areas: coachesFromServer[key].areas
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  }
};
