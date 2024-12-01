import { api } from '../instance'

export const finance = async ({ data, config }) => api.post(`finance`, data, config)
