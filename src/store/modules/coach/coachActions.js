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

    const axios = context.rootGetters.getAxios;
    const token = context.rootGetters.getToken;
    await axios.put(`coaches/${userId}.json?auth=${token}`, coach);

    context.commit('addCoach', {
      ...coach,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    const { forceUpdate } = payload;
    if (!forceUpdate && !context.getters.shouldUpdate) return;

    const axios = context.rootGetters.getAxios;
    const response = await axios.get(`/coaches.json`);

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
