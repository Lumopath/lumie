# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Metrics queries
    field :metrics, [Types::MetricType], null: false, description: "All metrics"
    field :metric, Types::MetricType, null: true, description: "Find a metric by ID" do
      argument :id, ID, required: true, description: "ID of the metric"
    end
    field :metrics_by_category, [Types::MetricType], null: false, description: "Metrics filtered by category" do
      argument :category, String, required: true, description: "Category to filter by"
    end

    def metrics
      Metric.recent
    end

    def metric(id:)
      Metric.find_by(id: id)
    end

    def metrics_by_category(category:)
      Metric.by_category(category).recent
    end
  end
end
