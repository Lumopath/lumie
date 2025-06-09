class CreateMetrics < ActiveRecord::Migration[8.0]
  def change
    create_table :metrics do |t|
      t.string :name
      t.decimal :value
      t.string :unit
      t.text :description
      t.string :category
      t.datetime :recorded_at

      t.timestamps
    end
  end
end
