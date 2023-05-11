class User < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :news_articles, dependent: :destroy
  # belongs_to :user

  has_secure_password

  # Validations
  validates :first_name, presence: true
  validates :last_name, presence: true
  # Allow for case insensitive uniqueness of email
  validates :email, presence: true, uniqueness: { case_sensitive: false }, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  # Allow for minimum length of 8 characters for password and only validate if password is not nil
  validates :password, length: { minimum: 8 }, if: -> { new_record? || !password.nil? }

  # Callbacks
  before_save :formatted_names

  # Instance Methods
  def formatted_names
    self.first_name = first_name.titleize
    self.last_name = last_name.titleize
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def admin?
    self.admin
  end
end
