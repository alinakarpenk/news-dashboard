import { act , render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from '../app/user/profile/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('Profile', () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({
      push: mockPush,
    });
    global.fetch = jest.fn((url, options) => {
      if (url === '/api/user/login' && (!options || options.method === 'GET')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ login: 'testuser', email: 'test@example.com' }),
        });
      }
      if (url === '/api/user/login' && options && options.method === 'DELETE') {
        return Promise.resolve({
          redirected: true,
          url: '/login',
        });
      }
      return Promise.reject(new Error('Неочікуваний виклик'));
    });
  });

 it('рендерить дані користувача після завантаження', async () => {
  await act( async() => {
    render(<Profile />);
  })
  await waitFor(() => {
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/Користувач/)).toBeInTheDocument();
  });
});
  it('перенаправляє на сторінку новин користувача', async () => {
  await act( async() => {
    render(<Profile />);
  })
      const newsBtn = screen.getByText('Переглянути новини');
    fireEvent.click(newsBtn);
    expect(mockPush).toHaveBeenCalledWith('/user/profile/news');
  });

  it('перенаправляє на сторінку додавання новини', async () => {
  await act( async() => {
    render(<Profile />);
  })
      const addBtn = screen.getByText('Додати новину');
    fireEvent.click(addBtn);
    expect(mockPush).toHaveBeenCalledWith('/news/add');
  });

  it('успішно виконує вихід', async () => {
    delete window.location;
    window.location = { href: '' };
  await act( async() => {
    render(<Profile />);
  })
      const logoutBtn = screen.getByText('Вийти');
    fireEvent.click(logoutBtn);
    await waitFor(() => {
      expect(window.location.href).toBe('/login');
    });
    expect(global.fetch).toHaveBeenCalledWith('/api/user/login', { method: 'DELETE' });
  });
});
