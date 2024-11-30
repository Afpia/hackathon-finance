import toast from 'react-hot-toast'

export const notifySuccess = () => toast.success('Вы вошли в систему')
export const notifyError = (error) => toast.error(`Мы не смогли войти в систему ${error}`)
