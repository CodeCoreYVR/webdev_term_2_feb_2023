class Product < ApplicationRecord
  # Validations
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :price, numericality: { greater_than: 0 }
  validates :description, presence: true, length: { minimum: 10 }

  # Callbacks
  before_save :round_price_to_two_decimal_places

  # Private methods
  private

  # Method to round the price attribute to 2 decimal places before saving it
  def round_price_to_two_decimal_places
    self.price = price.round(2) # Use the `round` method to round the `price` attribute to 2 decimal places
  end
end
