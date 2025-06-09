# Lumie - Business Metrics Dashboard

A modern business metrics dashboard built with Rails API (GraphQL) and NextJS frontend.

## Project Structure

```
lumie/
├── api/          # Rails API with GraphQL
└── web/          # NextJS frontend application
```

## Features

- **Rails API**: GraphQL-powered API with business metrics
- **Modern Frontend**: NextJS with TypeScript, Tailwind CSS, and Apollo Client
- **Real-time Updates**: Dashboard polls for updates every 30 seconds
- **Business KPIs**: Tracks ARR, MRR, customer metrics, growth rates, and more
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Getting Started

### Prerequisites

- Ruby 3.4+
- Node.js 19+
- SQLite3

### Setup

1. **Start the Rails API** (Terminal 1):
   ```bash
   cd api
   bundle install
   rails db:create db:migrate db:seed
   rails server -p 3001
   ```

2. **Start the NextJS Frontend** (Terminal 2):
   ```bash
   cd web
   npm install
   npm run dev
   ```

3. **Access the Dashboard**:
   - Frontend: http://localhost:3000
   - GraphQL API: http://localhost:3001/graphql

## API Endpoints

### GraphQL Queries

- `metrics` - Get all metrics
- `metric(id: ID!)` - Get a specific metric
- `metricsByCategory(category: String!)` - Get metrics by category

### Example Query

```graphql
{
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
```

## Metrics Categories

- **Revenue**: ARR, MRR
- **Customers**: Active accounts, churn rate
- **Growth**: Growth rates, retention
- **Financial**: CAC, LTV, margins
- **Engagement**: Daily active users

## Technology Stack

### Backend (Rails API)
- Ruby on Rails 8.0 (API mode)
- GraphQL Ruby
- SQLite3 database
- CORS enabled for frontend communication

### Frontend (NextJS)
- NextJS 15 with App Router
- TypeScript
- Tailwind CSS
- Apollo Client for GraphQL
- Lucide React for icons

## Development

The application includes:
- Sample business metrics data
- Real-time polling for updates
- Error handling and loading states
- Responsive design with modern UI
- Type-safe GraphQL integration

## Sample Metrics

The application comes pre-seeded with realistic business metrics including:
- Annual Recurring Revenue (ARR): $2,850,000
- Monthly Recurring Revenue (MRR): $237,500
- Active Accounts: 1,847
- Customer Acquisition Cost (CAC): $485
- Monthly Churn Rate: 3.2%
- Customer Lifetime Value (LTV): $4,250
- Net Revenue Retention (NRR): 112.8%
- Daily Active Users: 12,450
- Gross Margin: 78.5%
- Monthly Growth Rate: 8.3%