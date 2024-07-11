import React from 'react';
import HomePage from './homePage';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/tanstack/queryClient';
import { fetchItems } from '@/lib/tanstack/fetchItems';

const Home: React.FC = async () => {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(fetchItems)

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePage />
      </HydrationBoundary>
    </main>
  );
};

export default Home;
