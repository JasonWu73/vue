export default {
  addCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.lastUpdatedTimeStamp = new Date().getTime();
    state.coaches = payload;
  }
};
