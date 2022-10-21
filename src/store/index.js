import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToken,
  setToken,
  decodeToken,
  removeToken
} from '@/utils/cookies'
import { login, getUserInfo } from '@/api/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogued: false,
    user: {}
  },
  mutations: {
    SET_LOGIN (state, value) {
      state.isLogued = value
    },
    SET_USER (state, value) {
      state.user = value
    }
  },
  actions: {
    async login ({ commit }, data) {
      try {
        const res = await login(data)
        const token = res.data.access
        const decoded = decodeToken(token)
        commit('SET_LOGIN', true)
        setToken(token)
        return decoded
      } catch (error) {
        console.log(error)
      }
      return false
    },
    // user logout
    logout () {
      return new Promise(resolve => {
        removeToken()
        resolve()
      })
    },
    async getUser ({ commit }) {
      let token = getToken()
      token = decodeToken(token)
      if (token) {
        try {
          const user = await getUserInfo(token.user_id)
          console.log(user.data)
          commit('SET_LOGIN', true)
          commit('SET_USER', user.data)
          return user.data
        } catch (error) {
          console.log(error)
        }
      }
      return false
    }
  },
  modules: {}
})
