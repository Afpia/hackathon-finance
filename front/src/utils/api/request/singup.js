import { api } from '../instance'

export const signup = async ({ data, config }) => api.get(`register`, data, config)
