import { api } from '../instance'

export const login = async ({ data, config }) => api.post(`login`, data, config)
