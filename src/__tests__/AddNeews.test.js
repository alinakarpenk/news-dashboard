import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddNews from '../app/(news)/news/add/page'; // ЗМІНИ шлях, якщо інший

global.fetch = jest.fn();

describe('AddNews component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
   it('рендерить форму додавання новини', () => {
    render(<AddNews />);
    expect(screen.getByRole('heading', { name: 'Додати новину' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Text...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Додати новину' })).toBeInTheDocument();
  });
  it('успішно відправляє форму та показує повідомлення', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    render(<AddNews />);
    const file = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(screen.getByTestId('file-input'), {
      target: { files: [file] },
    });
    fireEvent.change(screen.getByPlaceholderText('Title...'), { target: { value: 'Заголовок' } });
    fireEvent.change(screen.getByPlaceholderText('Text...'), { target: { value: 'Опис новини' } });
    fireEvent.click(screen.getByRole('button', { name: 'Додати новину' }));
    await waitFor(() => {
      expect(screen.getByText('Додано новину')).toBeInTheDocument();
    });
  });
})