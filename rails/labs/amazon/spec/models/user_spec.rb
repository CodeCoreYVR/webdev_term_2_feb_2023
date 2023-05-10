require 'rails_helper'

RSpec.describe User, type: :model do

  describe '#full_name' do
    let(:user) { build(:user, first_name: 'John', last_name: 'Doe') }

    it 'returns the full name' do
      expect(user.full_name).to eq('John Doe')
    end
  end

  describe '#admin?' do
    let(:admin_user) { build(:user, admin: true) }
    let(:non_admin_user) { build(:user, admin: false) }

    it 'returns true for admin user' do
      expect(admin_user.admin?).to be_truthy
    end

    it 'returns false for non-admin user' do
      expect(non_admin_user.admin?).to be_falsey
    end
  end
end
