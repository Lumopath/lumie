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
import styles from './MetricCard.module.css';

interface MetricCardProps {
  metric: Metric;
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'revenue':
      return <DollarSign size={24} />;
    case 'customers':
      return <Users size={24} />;
    case 'growth':
      return <TrendingUp size={24} />;
    case 'engagement':
      return <Activity size={24} />;
    case 'financial':
      return <BarChart3 size={24} />;
    default:
      return <Target size={24} />;
  }
};

const getCategoryClass = (category: string) => {
  switch (category.toLowerCase()) {
    case 'revenue':
      return styles.revenue;
    case 'customers':
      return styles.customers;
    case 'growth':
      return styles.growth;
    case 'engagement':
      return styles.engagement;
    case 'financial':
      return styles.financial;
    default:
      return styles.default;
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
  const iconClass = getCategoryClass(metric.category);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={`${styles.iconWrapper} ${iconClass}`}>
            {getCategoryIcon(metric.category)}
          </div>
          <h3 className={styles.title}>
            {metric.name}
          </h3>
        </div>
      </div>

      <div className={styles.value}>
        {formatValue(metric)}
      </div>

      {metric.description && (
        <p className={styles.description}>
          {metric.description}
        </p>
      )}

      <div className={styles.footer}>
        <span className={styles.category}>
          {metric.category}
        </span>
        <span>
          {new Date(metric.recordedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}