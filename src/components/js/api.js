import axios from 'axios'
export const api = params => { return axios.post(`/api/api.html`, params).then(res => res.data) }
