import { SignupFormSchema, EditFormSchema } from '../lib/definition';

describe('SignupFormSchema', () => {
  it('Валідно', () => {
    const data = {
      login: 'testuser',
      email: 'user@gmail.com',
      password: 'pass1234A',
      passwordRepeat: 'pass1234A',
    };
    const result = SignupFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
    it('Недостатньо довгий логін', () => {
    const data = {
      login: 'usr',
      email: 'user@gmail.com',
      password: 'pass1234A',
      passwordRepeat: 'pass1234A',
    };
    const result = SignupFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error.format().login?._errors[0]).toBe('Логін повинен бути довшим за 4 символа');
  });

  it('Неправильний email', () => {
    const data = {
      login: 'testuser',
      email: 'usergmail.com',
      password: 'pass1234A',
      passwordRepeat: 'pass1234A',
    };
    const result = SignupFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error.format().email?._errors[0]).toBe('Введіть правильну електронну пошту');
  });

describe('EditFormSchema', () => {
  it('Валідно', () => {
    const data = {
      login: 'testuser',
      futurepass: 'pass1234A',
    };
    const result = EditFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('Недостатньо довгий логін', () => {
    const data = {
      login: 'usr',
      futurepass: 'pass1234A',
    };
    const result = EditFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error.format().login?._errors[0]).toBe('Логін повинен бути довшим за 4 символа');
  });

  it('Короткий пароль', () => {
    const data = {
      login: 'testuser',
      futurepass: 'pass1',
    };
    const result = EditFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error.format().futurepass?._errors).toContain('Пароль повинен бути більше 8 символів');
  });
})
})