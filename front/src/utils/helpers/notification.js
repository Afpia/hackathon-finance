import toast from 'react-hot-toast'

export const notifySuccess = (message) => toast.success(message)
export const notifyError = (error) => toast.error(error)
