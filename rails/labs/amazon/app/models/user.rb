class User < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :reviews, dependent: :destroy
end
