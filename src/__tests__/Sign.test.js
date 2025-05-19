import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sign from '../app/user/sign/page';

describe('Sign-in form', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url, options) => {
      if (url === '/api/user/login' && options.method === 'POST') {
        const { email, password } = JSON.parse(options.body);
        if (email === 'test@example.com' && password === '1234') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
          });
        } else {
          return Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ error: 'Невірні дані' }),
          });
        }
      }
    });
  });

  it('авторизує користувача з правильними даними', async () => {
    delete window.location;
    window.location = { href: '' };
    render(<Sign />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /увійти/i }));
    await waitFor(() => {
      expect(window.location.href).toBe('/user/profile');
    });
  });

  it('виводить помилку при неправильному логіні', async () => {
    render(<Sign />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /увійти/i }));
    await waitFor(() => {
      expect(screen.getByText('Невірні дані')).toBeInTheDocument();
    });
  });
});
