import { Metric } from '@/lib/queries';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  Target
} from 'lucide-react';

interface MetricCardProps {
  metric: Metric;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'revenue':
      return <DollarSign className="h-6 w-6" />;
    case 'customers':
      return <Users className="h-6 w-6" />;
    case 'growth':
      return <TrendingUp className="h-6 w-6" />;
    case 'engagement':
      return <Activity className="h-6 w-6" />;
    case 'financial':
      return <BarChart3 className="h-6 w-6" />;
    default:
      return <Target className="h-6 w-6" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'revenue':
      return 'text-green-600 bg-green-100';
    case 'customers':
      return 'text-blue-600 bg-blue-100';
    case 'growth':
      return 'text-purple-600 bg-purple-100';
    case 'engagement':
      return 'text-orange-600 bg-orange-100';
    case 'financial':
      return 'text-indigo-600 bg-indigo-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const formatValue = (metric: Metric) => {
  if (metric.unit?.toLowerCase().includes('usd') || metric.unit?.toLowerCase().includes('currency')) {
    return `$${Number(metric.value).toLocaleString()}`;
  }
  if (metric.unit?.toLowerCase().includes('percentage')) {
    return `${metric.value}%`;
  }
  return Number(metric.value).toLocaleString();
};

export default function MetricCard({ metric }: MetricCardProps) {
  const iconColorClass = getCategoryColor(metric.category);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${iconColorClass}`}>
              {getCategoryIcon(metric.category)}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 leading-tight">
                {metric.name}
              </h3>
              <p className="text-xs text-gray-500 capitalize mt-1">
                {metric.category}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(metric)}
            </p>
          </div>

          {metric.description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {metric.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Last updated: {new Date(metric.recordedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}