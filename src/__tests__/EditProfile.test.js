import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProfile from '../app/user/profile/edit/page';

describe('Edit Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn((url, options) => {
      if (url === '/api/user/login' && (!options || options.method === 'GET')) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              login: 'testolduser',
              lastpass: 'testoldpass',
              futurepass: 'testnewpass',
            }),
        });
      }
      if (url === '/api/user/login' && options.method === 'PATCH') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ok: true }),
        });
      }
      return Promise.reject(new Error('Неочікуваний запит'));
    });
  });
  it('рендерить вхідні дані користувача після завантаження', async () => {
    render(<EditProfile />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Новий логін')).toHaveValue('testolduser');
      expect(screen.getByPlaceholderText('Старий пароль')).toHaveValue('testoldpass');
      expect(screen.getByPlaceholderText('Новий пароль')).toHaveValue('testnewpass');
    });
  });
  it('надсилає PATCH при оновленні профілю', async () => {
    render(<EditProfile />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Новий логін')).toHaveValue('testolduser');
    });
    fireEvent.change(screen.getByPlaceholderText('Новий логін'), {
      target: { value: 'newtestuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Старий пароль'), {
      target: { value: 'oldpass1234' },
    });
    fireEvent.change(screen.getByPlaceholderText('Новий пароль'), {
      target: { value: 'newpass5678' },
    });
    fireEvent.click(screen.getByRole('button', { name: /оновити/i }));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/user/login', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: 'newtestuser',
          lastpass: 'oldpass1234',
          futurepass: 'newpass5678',
        }),
      });
    });
  });

  it('обробляє помилку', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            login: 'user',
            lastpass: '',
            futurepass: ''
          }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: 'Помилка оновлення' }),
        })
      );
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<EditProfile />);
    fireEvent.change(await screen.findByPlaceholderText('Новий логін'), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByRole('button', { name: /оновити/i }));
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Помилка оновлення');
    });
    consoleSpy.mockRestore();
  });
});
