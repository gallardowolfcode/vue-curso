import request from '@/utils/axios'

export function login (data) {
  return request({
    url: '/auth/login/',
    public: true,
    method: 'POST',
    data
  })
}

export function getUserInfo (id) {
  return request({
    url: '/api/users/' + id + '/',
    method: 'GET'
  })
}