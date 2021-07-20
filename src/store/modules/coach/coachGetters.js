export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    return state.coaches.some(coach => coach.id === rootGetters.getUserId);
  },
  shouldUpdate(state) {
    const lastUpdatedTimeStamp = state.lastUpdatedTimeStamp;
    const currentTimeStamp = new Date().getTime();
    return !lastUpdatedTimeStamp
      || (currentTimeStamp - lastUpdatedTimeStamp > 60 * 1000);
  }
};
