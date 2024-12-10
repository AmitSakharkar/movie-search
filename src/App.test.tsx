import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { fetchMovies } from './services/api';

jest.mock('./services/api');

const mockFetchMovies = fetchMovies as jest.MockedFunction<typeof fetchMovies>;

test('Should render search bar on app load', () => {
  render(<App />);
  const searchElement = screen.getByPlaceholderText(/Search for a movie.../i);
  expect(searchElement).toBeInTheDocument();
});

test('Should display loader while fetching movies', async () => {
  mockFetchMovies.mockResolvedValueOnce([]);
  render(<App />);
  const searchElement = screen.getByPlaceholderText(/Search for a movie.../i);
  fireEvent.change(searchElement, { target: { value: 'Inception' } });
  fireEvent.submit(searchElement);
  expect(screen.getByTestId('loader')).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());
});

test('Should display movies after fetching', async () => {
  const movies = [{
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://example.com/inception.jpg'
  }];
  mockFetchMovies.mockResolvedValueOnce(movies);
  render(<App />);
  const searchElement = screen.getByPlaceholderText(/Search for a movie.../i);
  fireEvent.change(searchElement, { target: { value: 'Inception' } });
  fireEvent.submit(searchElement);
  await waitFor(() => expect(screen.getByText('Inception')).toBeInTheDocument());
});

test('Should handle fetch error gracefully', async () => {
  mockFetchMovies.mockRejectedValueOnce(new Error('Failed to fetch'));
  render(<App />);
  const searchElement = screen.getByPlaceholderText(/Search for a movie.../i);
  fireEvent.change(searchElement, { target: { value: 'Inception' } });
  fireEvent.submit(searchElement);
  await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());
  expect(screen.queryByText('Inception')).not.toBeInTheDocument();
});

