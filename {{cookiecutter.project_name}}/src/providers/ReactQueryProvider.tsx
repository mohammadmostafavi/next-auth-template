'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function ReactQueryProvider({ children }: PropsWithChildren<unknown>) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <div id='rq-dev' dir='ltr'>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      </div>
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;