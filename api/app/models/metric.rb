class Metric < ApplicationRecord
  validates :name, presence: true
  validates :value, presence: true, numericality: true
  validates :category, presence: true
  validates :recorded_at, presence: true

  scope :recent, -> { order(recorded_at: :desc) }
  scope :by_category, ->(category) { where(category: category) }
  scope :current_month, -> { where(recorded_at: Time.current.beginning_of_month..Time.current.end_of_month) }
  scope :last_month, -> { where(recorded_at: 1.month.ago.beginning_of_month..1.month.ago.end_of_month) }

  CATEGORIES = %w[
    revenue
    customers
    growth
    engagement
    financial
  ].freeze

  def self.enabled(company_name:)
    all.select do |metric|
      (metric.status.include?("is Enabled") || metric.status.include?("is Active") || metric.status.include?("is enabled") || metric.status.include?("is active")) &&
      !metric.status.include?("Disabled") && !metric.status.include?("disabled") &&
      !metric.status.include?("inactive") && !metric.status.include?("INACTIVE") &&
      !metric.status.include?("NA") && !metric.status.include?("N/A") &&
      metric.recorded_at == Metric.where(category: metric.category, name: metric.name).maximum(:recorded_at)
    end
  end

  def formatted_value
    case unit&.downcase
    when 'currency', 'usd', '$'
      "$#{value.to_f.round(2)}"
    when 'percentage', '%'
      "#{value.to_f.round(2)}%"
    else
      value.to_f.round(2).to_s
    end
  end

  def self.seed_sample_data
    sample_metrics = [
      {
        company_name: "Lumopath",
        name: 'Annual Recurring Revenue (ARR)',
        value: 2_850_000,
        unit: 'USD',
        description: 'Total annual recurring revenue from all active subscriptions',
        category: 'revenue',
        recorded_at: Time.current,
        status: "The status of the metric is Enabled for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Monthly Recurring Revenue (MRR)',
        value: 237_500,
        unit: 'USD',
        description: 'Monthly recurring revenue normalized from all subscriptions',
        category: 'revenue',
        recorded_at: Time.current,
        status: "The status of the metric is Active for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Active Accounts',
        value: 1_847,
        unit: 'count',
        description: 'Number of accounts with active subscriptions',
        category: 'customers',
        recorded_at: Time.current,
        status: "The status of the metric is Active for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Customer Acquisition Cost (CAC)',
        value: 485,
        unit: 'USD',
        description: 'Average cost to acquire a new customer',
        category: 'financial',
        recorded_at: Time.current,
        status: "The status of the metric is Active for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Monthly Churn Rate',
        value: 3.2,
        unit: 'percentage',
        description: 'Percentage of customers who canceled their subscription this month',
        category: 'customers',
        recorded_at: Time.current,
        status: "The status of the metric is Active for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Customer Lifetime Value (LTV)',
        value: 4_250,
        unit: 'USD',
        description: 'Average revenue expected from a customer over their lifetime',
        category: 'financial',
        recorded_at: Time.current,
        status: "The status of the metric is Active for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Net Revenue Retention (NRR)',
        value: 112.8,
        unit: 'percentage',
        description: 'Revenue retention rate including expansion revenue',
        category: 'growth',
        recorded_at: Time.current,
        status: "The status of the metric is Active for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Daily Active Users',
        value: 12_450,
        unit: 'count',
        description: 'Number of unique users active in the last 24 hours',
        category: 'engagement',
        recorded_at: Time.current,
        status: "The status of the metric is Enabled for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Gross Margin',
        value: 78.5,
        unit: 'percentage',
        description: 'Gross profit margin after direct costs',
        category: 'financial',
        recorded_at: Time.current,
        status: "The status of the metric is Active for June 2025"
      },
      {
        company_name: "Lumopath",
        name: 'Monthly Growth Rate',
        value: 8.3,
        unit: 'percentage',
        description: 'Month-over-month growth rate in revenue',
        category: 'growth',
        recorded_at: Time.current,
        status: "The status of the metric is active for June 2025"
      }
    ]

    sample_metrics.each do |metric_attrs|
      find_or_create_by(
        name: metric_attrs[:name],
        recorded_at: metric_attrs[:recorded_at].beginning_of_day
      ) do |metric|
        metric.assign_attributes(metric_attrs)
      end
    end
  end

  def self.generate_disabled_metrics(count: 100_000)
    metric_names = [
      'Revenue Growth Rate',
      'Customer Satisfaction Score',
      'Net Promoter Score',
      'Conversion Rate',
      'Average Order Value',
      'Customer Retention Rate',
      'Website Traffic',
      'Bounce Rate',
      'Time on Site',
      'Social Media Engagement',
      'Email Open Rate',
      'Click-Through Rate',
      'Cost per Acquisition',
      'Return on Investment',
      'Profit Margin'
    ]

    units = ['USD', 'percentage', 'count', 'hours', 'minutes', 'days']
    categories = CATEGORIES

    count.times do
      create!(
        name: metric_names.sample,
        value: rand(1..10000),
        unit: units.sample,
        description: "Random metric for performance testing",
        category: categories.sample,
        recorded_at: rand(1.year.ago..Time.current),
        status: ["inactive", "INACTIVE", "disabled", "DISABLED", "NA", "N/A"].sample
      )
    end
  end
end