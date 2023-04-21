class Product < ApplicationRecord
  # Callbacks
  before_validation :set_default_price
  before_validation :round_price_to_two_decimal_places
  before_validation :capitalize_title
  
  # Validations
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :price, numericality: { greater_than: 0 }
  validates :description, presence: true, length: { minimum: 10 }

  
  # Private methods
  private

  # Method to round the price attribute to 2 decimal places before saving it
  def round_price_to_two_decimal_places
    self.price = price.round(2)
  end

  # Method to set default price to 1 if it is not already set
  def set_default_price
    self.price ||= 1
  end

  # Method to capitalize the title before saving it
  def capitalize_title
    self.title = title.capitalize
  end
end
