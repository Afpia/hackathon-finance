import { api } from '../instance'

export const signup = async ({ data, config }) => api.post(`register`, data, config)
