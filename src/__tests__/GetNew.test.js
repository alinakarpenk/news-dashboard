import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import GetNewsByPK from '../app/(news)/news/[id]/page';
import { useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

const mockNews = {
  id: 1,
  title: 'Тестова новина',
  text: 'Це текст новини.',
  date: '2025-05-19',
  image: '/image.jpg',
  User: { login: 'Автор' },
  Comments: [
    {
      id: 1,
      text: 'Це коментар',
      date: '2025-05-18',
      User: { login: 'Користувач1' },
    },
  ],
};

describe('GetNewsByPK page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    useParams.mockReturnValue({ id: '1' });
  });

  it('відображає Loading...', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNews,
    });
    render(<GetNewsByPK />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Тестова новина')).toBeInTheDocument();
    });
  });
  it('відображає новину, автора та коментарі', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNews,
    });
    render(<GetNewsByPK />);
    await waitFor(() => {
      expect(screen.getByText(mockNews.title)).toBeInTheDocument();
      expect(screen.getByText(mockNews.text)).toBeInTheDocument();
      expect(screen.getByText(`Автор: ${mockNews.User.login}`)).toBeInTheDocument();
      expect(screen.getByText('Це коментар')).toBeInTheDocument();
    });
  });

  it('додає новий коментар після сабміту форми', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNews,
    });
    const newComment = {
      id: 102,
      text: 'Новий коментар',
      date: '2025-05-19',
      User: { login: 'ТестКоментатор' },
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newComment,
    });
    render(<GetNewsByPK />);
    await waitFor(() => {
      expect(screen.getByText(mockNews.title)).toBeInTheDocument();
    });
    const textarea = screen.getByPlaceholderText('Напишіть ваш коментар');
    fireEvent.change(textarea, { target: { value: 'Новий коментар' } });
    const button = screen.getByRole('button', { name: 'Додати коментар' });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('Новий коментар')).toBeInTheDocument();
      expect(screen.getByText('ТестКоментатор:')).toBeInTheDocument();
    });
  });
});
