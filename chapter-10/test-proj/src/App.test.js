import { render, screen } from '@testing-library/react';
import App from './App';

test('learn react link가 화면에 표시되나요?', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
