module Types
  class MetricType < Types::BaseObject
    description "A business KPI metric"

    field :id, ID, null: false
    field :name, String, null: false
    field :value, Float, null: false
    field :unit, String, null: true
    field :description, String, null: true
    field :category, String, null: false
    field :recorded_at, GraphQL::Types::ISO8601DateTime, null: false
    field :formatted_value, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def formatted_value
      object.formatted_value
    end
  end
end