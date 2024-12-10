import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('SearchBar calls onSearch with input value', () => {
  const mockOnSearch = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <SearchBar onSearch={mockOnSearch} />
  );

  const input = getByPlaceholderText('Search for a movie...');
  fireEvent.change(input, { target: { value: 'Inception' } });

  const button = getByText('Search');
  fireEvent.click(button);

  expect(mockOnSearch).toHaveBeenCalledWith('Inception');
});

test('SearchBar does not call onSearch with empty input', () => {
  const mockOnSearch = jest.fn();
  const { getByText } = render(
    <SearchBar onSearch={mockOnSearch} />
  );

  const button = getByText('Search');
  fireEvent.click(button);

  expect(mockOnSearch).not.toHaveBeenCalled();
});

test('SearchBar updates input value on change', () => {
  const { getByPlaceholderText } = render(
    <SearchBar onSearch={() => {}} />
  );

  const input = getByPlaceholderText('Search for a movie...');
  fireEvent.change(input, { target: { value: 'Interstellar' } });

  expect(input).toHaveValue('Interstellar');
});
