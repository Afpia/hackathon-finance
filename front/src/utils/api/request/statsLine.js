import { api } from '../instance'

export const statsLine = async ({ config }) => api.get(`categories/analytic`, config)
