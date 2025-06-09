'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import MetricsDashboard from '@/components/MetricsDashboard';

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <MetricsDashboard />
    </ApolloProvider>
  );
}
