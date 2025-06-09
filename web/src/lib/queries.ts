import { gql } from '@apollo/client';

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