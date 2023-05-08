module CommonHelpers

    def valid_user
      return user = { 
        first_name: 'John',
        last_name: 'Smith',
        email: 'john@smith.com',
        password: 'supersecret'
      }
    end
  
  end