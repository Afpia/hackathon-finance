import { api } from '../instance'

export const stats = async ({ config }) => api.get(`finance/analytic/year`, config)
