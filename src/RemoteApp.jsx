import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import PortfolioScreen from './screens/PortfolioScreen';

const queryClient = new QueryClient();

const App = (props) => {
  return (
    <QueryClientProvider {...props} client={queryClient}>
      <PortfolioScreen />
    </QueryClientProvider>
  );
};

export default App;
