import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from './client';

export const GET_METRICS = gql`
  query GetMetrics {
    metrics {
      id
      name
      value
      unit
      description
      category
      recordedAt
      formattedValue
    }
  }
`;

export const GET_METRICS_BY_CATEGORY = gql`
  query GetMetricsByCategory($category: String!) {
    metricsByCategory(category: $category) {
      id
      name
      value
      unit
      description
      category
      recordedAt
      formattedValue
    }
  }
`;

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit?: string;
  description?: string;
  category: string;
  recordedAt: string;
  formattedValue: string;
}

// React Query hooks
export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const data = await graphqlClient.request(GET_METRICS);
      return data.metrics as Metric[];
    },
  });
};

export const useMetricsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['metrics', 'category', category],
    queryFn: async () => {
      const data = await graphqlClient.request(GET_METRICS_BY_CATEGORY, { category });
      return data.metricsByCategory as Metric[];
    },
    enabled: !!category,
  });
};