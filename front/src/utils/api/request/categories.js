import { api } from '../instance'

export const categories = async ({ config }) => api.get(`categories`, config)
