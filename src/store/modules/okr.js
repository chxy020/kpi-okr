const state = {
  period: '',
}

const mutations = {
  SELECT_PERIOD: (state, period) => {
    state.period = period
  }
}
const actions = {
  selectPeriod({
    commit
  }, period) {
    commit('SELECT_PERIOD', period)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
