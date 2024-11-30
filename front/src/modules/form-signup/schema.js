import { z } from 'zod'

export const SignupSchema = z
	.object({
		name: z.string().min(2, 'Минимум 2 символа').max(25, 'Максимум 25 символов'),
		email: z.string().email('Неправильная почта'),
		password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
		password_confirmation: z.string()
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'Пароль не совпадает',
		path: ['password_confirmation']
	})
