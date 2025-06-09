class StreamController < ApplicationController
  include ActionController::Live

  def index
    response.headers.merge!({
      "Content-Type" => "text/event-stream",
      "Cache-Control" => "no-cache",
      "X-Accel-Buffering" => "no", # For Nginx
      "Last-Modified" => Time.now.httpdate # Rack::ETag will complain if this is not set
    })

    sse = SSE.new(response.stream, retry: 300, event: "metrics")

    begin
      # Wait 5 seconds before next update
      sleep 5

      # Fetch current metrics
      metrics_data = fetch_metrics_data

      # Send metrics update via SSE
      sse.write({
        type: 'metrics_update',
        metrics: metrics_data,
        timestamp: Time.current.iso8601
      }.to_json)

      sse.write(nil, event: "complete")
    rescue IOError
      # Client disconnected
    ensure
      sse&.close
    end
  end

  private

  def fetch_metrics_data
    # Execute the same GraphQL query that the client uses
    query_string = "
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
    "

    result = ApiSchema.execute(query_string)
    result.dig('data', 'metrics') || []
  end
end