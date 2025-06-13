class AddStatusToMetrics < ActiveRecord::Migration[8.0]
  def change
    add_column :metrics, :status, :string, default: "inactive"
  end
end
