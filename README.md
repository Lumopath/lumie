# Lumie - Business Metrics Dashboard

A modern business metrics dashboard built with Rails API (GraphQL) and NextJS frontend featuring real-time updates via Server-Sent Events (SSE).

## Project Structure

```
lumie/
├── api/          # Rails API with GraphQL & SSE streaming
└── web/          # NextJS frontend application
```

## Features

- **Rails API**: GraphQL-powered API with business metrics and SSE streaming
- **Modern Frontend**: NextJS with TypeScript, CSS Modules, and React Query
- **Real-time Updates**: Server-Sent Events (SSE) for instant data streaming
- **Business KPIs**: Tracks ARR, MRR, customer metrics, growth rates, and more
- **Responsive Design**: Beautiful, modern light-themed UI with CSS modules
- **Type Safety**: Full TypeScript integration throughout the stack

## Architecture

### Real-time Data Flow
1. **GraphQL API**: Initial data fetching via React Query
2. **SSE Stream**: Real-time updates pushed from server at `/stream` endpoint
3. **Cache Updates**: React Query cache automatically updated with SSE data
4. **UI Updates**: Components re-render seamlessly with new data

### Technology Stack

#### Backend (Rails API)
- Ruby on Rails 8.0 (API mode)
- GraphQL Ruby with custom resolvers
- SQLite3 database
- Server-Sent Events (SSE) for real-time streaming
- CORS configured for cross-origin requests

#### Frontend (NextJS)
- NextJS 15 with App Router
- TypeScript for type safety
- **CSS Modules** for component styling
- **React Query** (@tanstack/react-query) for data fetching & caching
- **GraphQL Request** for GraphQL client
- Lucide React for icons

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
   rails db:create db:migrate
   # Seed sample data
   rails runner "Metric.seed_sample_data"
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
   - SSE Stream: http://localhost:3001/stream

## API Endpoints

### GraphQL Queries

- `metrics` - Get all metrics
- `metric(id: ID!)` - Get a specific metric
- `metricsByCategory(category: String!)` - Get metrics by category

### SSE Streaming

- `GET /stream` - Server-Sent Events endpoint for real-time metrics updates
- Streams JSON data every 5 seconds with updated metrics
- Automatically reconnects on connection loss

### Example GraphQL Query

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

### Example SSE Event

```json
{
  "type": "metrics_update",
  "metrics": [...],
  "timestamp": "2024-06-09T15:30:00Z"
}
```

## Data Management

### React Query Integration
- Queries cached with 5-minute stale time
- Automatic background refetching
- SSE updates bypass cache refresh
- Error handling with retry logic

### CSS Modules
- Component-scoped styling
- Clean, modern light theme
- Responsive design with CSS Grid
- Smooth hover animations and transitions

## Metrics Categories

- **Revenue**: ARR, MRR
- **Customers**: Active accounts, churn rate
- **Growth**: Growth rates, retention
- **Financial**: CAC, LTV, margins
- **Engagement**: Daily active users

## Development Features

- **Real-time Updates**: SSE streams provide instant data updates
- **Optimistic UI**: React Query manages loading and error states
- **Type Safety**: Full TypeScript coverage with GraphQL codegen
- **Modern Styling**: CSS modules with CSS custom properties
- **Error Boundaries**: Graceful error handling throughout the application
- **Responsive Design**: Mobile-first approach with clean, professional styling

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

## Recent Updates

- ✅ Migrated from Apollo Client to React Query for better caching and performance
- ✅ Replaced Tailwind CSS with CSS Modules for better component encapsulation
- ✅ Implemented Server-Sent Events (SSE) for real-time data streaming
- ✅ Added comprehensive CORS configuration for cross-origin requests
- ✅ Updated to modern, clean light theme with improved accessibility
- ✅ Enhanced error handling and loading states throughout the application