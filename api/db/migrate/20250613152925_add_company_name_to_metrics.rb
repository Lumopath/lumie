class AddCompanyNameToMetrics < ActiveRecord::Migration[8.0]
  def change
    add_column :metrics, :company_name, :string
  end
end
