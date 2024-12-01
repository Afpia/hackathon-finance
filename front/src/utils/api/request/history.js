import { api } from '../instance'

export const history = async ({ config }) => api.get(`finance`, config)
