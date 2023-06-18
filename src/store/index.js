import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const mutations = {
  setToken(state, value) {
    state.token = value;
  },
  setName(state, value) {
    state.userName = value;
  },
  setEmail(state, value) {
    state.email = value;
  },
  setId(state, value) {
    state.id = value;
  },
  setAvatar(state, value) {
    state.avatar = value;
  },
  setBalance(state, value) {
    state.balance = value;
  },
  setPermission(state, value) {
    state.permission = value;
  },
  setReal(state, value) {
    state.real = value;
  },
};
const state = {
  token: "",
  userName: "",
  email: "",
  id: 0,
  avatar: "",
  balance: 0,
  permission: 1,
  real: 0,
};
export default new Vuex.Store({
  state,
  mutations,
});
