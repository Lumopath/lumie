'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMetrics, Metric } from '@/lib/queries';
import { createSSEConnection } from '@/lib/client';
import MetricCard from './MetricCard';
import { Loader2, AlertCircle, BarChart3 } from 'lucide-react';
import styles from './MetricsDashboard.module.css';

export default function MetricsDashboard() {
  const queryClient = useQueryClient();
  const { data: metrics = [], isLoading, error } = useMetrics();

  // Set up SSE connection for real-time updates
  useEffect(() => {
    const eventSource = createSSEConnection((data) => {
      // Update the metrics query cache when new data arrives via SSE
      if (data.type === 'metrics_update') {
        queryClient.setQueryData(['metrics'], data.metrics);
      }
    });

    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <Loader2 className={`${styles.loadingIcon} animate-spin`} size={32} />
          <p className={styles.loadingText}>Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <AlertCircle className={styles.errorIcon} size={48} />
          <h2 className={styles.errorTitle}>
            Unable to load metrics
          </h2>
          <p className={styles.errorMessage}>
            Please make sure the API server is running on port 3001.
          </p>
          <p className={styles.errorDetails}>
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  // Group metrics by category
  const groupedMetrics = metrics.reduce((acc, metric) => {
    if (!acc[metric.category]) {
      acc[metric.category] = [];
    }
    acc[metric.category].push(metric);
    return acc;
  }, {} as Record<string, Metric[]>);

  const categoryOrder = ['revenue', 'customers', 'growth', 'financial', 'engagement'];
  const sortedCategories = categoryOrder.filter(cat => groupedMetrics[cat]);
  const otherCategories = Object.keys(groupedMetrics).filter(cat => !categoryOrder.includes(cat));

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.iconContainer}>
              <BarChart3 className={styles.icon} size={24} />
            </div>
            <h1 className={styles.title}>
              Business Metrics Dashboard
            </h1>
          </div>
          <p className={styles.subtitle}>
            Track your key performance indicators and business metrics in real-time
          </p>
        </div>

        {/* Metrics Grid */}
        {[...sortedCategories, ...otherCategories].map((category) => (
          <div key={category} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {category} Metrics
            </h2>
            <div className={styles.grid}>
              {groupedMetrics[category].map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>
        ))}

        {metrics.length === 0 && (
          <div className={styles.emptyState}>
            <BarChart3 className={styles.emptyIcon} size={48} />
            <h3 className={styles.emptyTitle}>
              No metrics available
            </h3>
            <p className={styles.emptyMessage}>
              Metrics will appear here once they are added to the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}