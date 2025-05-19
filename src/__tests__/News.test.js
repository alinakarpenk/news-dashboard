import { render, screen, waitFor } from '@testing-library/react';
import News from '../app/(news)/news/page';

global.fetch = jest.fn();

describe('News page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('відображає список новин при наявності даних', async () => {
    const mockNews = {
      rows: [
        {
          id: 1,
          title: 'Перша новина',
          image: '/image1.jpg',
          User: { login: 'Автор1' },
        },
        {
          id: 2,
          title: 'Друга новина',
          image: '/image2.jpg',
          User: { login: 'Автор2' },
        },
      ],
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockNews,
    });

    render(await News());

    await waitFor(() => {
      expect(screen.getByText('Перша новина')).toBeInTheDocument();
      expect(screen.getByText('Автор: Автор1')).toBeInTheDocument();
      expect(screen.getByText('Друга новина')).toBeInTheDocument();
      expect(screen.getByText('Автор: Автор2')).toBeInTheDocument();
    });
  });

  it('відображає повідомлення, якщо новин немає', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ rows: [] }),
    });

    render(await News());

    await waitFor(() => {
      expect(screen.getByText('Немає даних для відображення')).toBeInTheDocument();
    });
  });
});
