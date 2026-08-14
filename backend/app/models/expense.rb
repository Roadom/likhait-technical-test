class Expense < ApplicationRecord
  validates :date, comparison: { less_than_or_equal_to: Date.current }
  belongs_to :category
end
