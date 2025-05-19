import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  login: z
    .string()
    .min(4, { message: 'Логін повинен бути довшим за 4 символа' })
    .trim(),
  email: z.string().email({ message: 'Введіть правильну електронну пошту' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Пароль повинен бути більше 8 символів' })
    .regex(/[a-zA-Z]/, { message: 'Пароль повинен містити букву' })
    .regex(/[0-9]/, { message: 'Пароль повинен містити цифру' })
    .trim(),
    passwordRepeat: z.string().trim(),

})
 .refine((data) => data.password === data.passwordRepeat, {
    message: 'Паролі не співпадають',
    path: ['passwordRepeat'], 
  });

  export const EditFormSchema = z.object({
  login: z
    .string()
    .min(4, { message: 'Логін повинен бути довшим за 4 символа' })
    .trim(),
  futurepass: z
    .string()
    .min(8, { message: 'Пароль повинен бути більше 8 символів' })
    .regex(/[a-zA-Z]/, { message: 'Пароль повинен містити букву' })
    .regex(/[0-9]/, { message: 'Пароль повинен містити цифру' })
    .trim(),
})
