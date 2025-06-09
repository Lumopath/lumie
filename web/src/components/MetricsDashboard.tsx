'use client';

import { useQuery } from '@apollo/client';
import { GET_METRICS, Metric } from '@/lib/queries';
import MetricCard from './MetricCard';
import { Loader2, AlertCircle, BarChart3 } from 'lucide-react';

export default function MetricsDashboard() {
  const { loading, error, data } = useQuery(GET_METRICS, {
    pollInterval: 30000, // Refresh every 30 seconds
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to load metrics
          </h2>
          <p className="text-gray-600 mb-4">
            Please make sure the API server is running on port 3001.
          </p>
          <p className="text-sm text-gray-500">
            Error: {error.message}
          </p>
        </div>
      </div>
    );
  }

  const metrics: Metric[] = data?.metrics || [];

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Business Metrics Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Track your key performance indicators and business metrics in real-time
          </p>
        </div>

        {/* Metrics Grid */}
        {[...sortedCategories, ...otherCategories].map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
              {category} Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedMetrics[category].map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>
        ))}

        {metrics.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No metrics available
            </h3>
            <p className="text-gray-600">
              Metrics will appear here once they are added to the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}