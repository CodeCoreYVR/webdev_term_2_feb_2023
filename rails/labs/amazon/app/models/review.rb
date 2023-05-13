class Review < ApplicationRecord
  has_many :likes, dependent: :destroy
  # likers is an alias for all the users that have liked a review
  has_many :likers, through: :likes, source: :user
  
  belongs_to :product
  belongs_to :user

  validates :rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
end
