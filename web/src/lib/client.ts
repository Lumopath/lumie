import { QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';

// GraphQL client for making requests
const API_URL = process.env.NEXT_PUBLIC_API_URL
export const graphqlClient = new GraphQLClient(`${API_URL}/graphql`);

// React Query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// SSE connection for real-time updates
export const createSSEConnection = (onMessage: (data: any) => void) => {
  const eventSource = new EventSource(`${API_URL}/stream`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (error) {
      console.error('Error parsing SSE data:', error);
    }
  };

  eventSource.onerror = (error) => {
    console.error('SSE connection error:', error);
  };

  return eventSource;
};
