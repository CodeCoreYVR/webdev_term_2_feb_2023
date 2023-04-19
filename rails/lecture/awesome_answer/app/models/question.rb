class Question < ApplicationRecord

    validates :title, presence: true, uniqueness: {message: "needs to be unique!"}
    validates :body, length: {minimum: 5, maximum: 100} 

    # validate :body, no_monkey

    # private
    # # custom validation method
    # def no_monkey
    #     if body && body.downcase.include?("monkey")
    #         self.errors.add(:body, "must not contain monkey")
    #     end
    # end
end
