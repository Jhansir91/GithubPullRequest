import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders GitHub App footer', async () => {
  render(<App />);
  const footerElement = await screen.findByText(/© 2023 GitHub App. All rights reserved./i);
  expect(footerElement).toBeInTheDocument();
});
