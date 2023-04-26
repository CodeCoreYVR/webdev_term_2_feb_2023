class Product < ApplicationRecord
  # Associations
  has_many :reviews, dependent: :destroy

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

  # Class methods (self.method_name) are methods that can be called on the class itself
  def self.search(keyword)
    if keyword.present? # If keyword is not nil or empty
      # Search for products whose title or description contains the keyword (case insensitive) and order them by title
      where("LOWER(title) LIKE ? OR LOWER(description) LIKE ?", "%#{keyword.downcase}%", "%#{keyword.downcase}%")
        .order(Arel.sql("CASE WHEN LOWER(title) LIKE '#{keyword.downcase}%' THEN 0 ELSE 1 END"))
    else
      all
    end
  end
end
