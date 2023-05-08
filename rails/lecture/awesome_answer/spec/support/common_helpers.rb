module CommonHelpers

    def valid_user
      return user = { 
        first_name: 'John',
        last_name: 'Smith',
        email: 'john@smith.com',
        password: 'supersecret'
      }
    end

    def valid_user_2
      return user = { 
        first_name: 'Peter',
        last_name: 'Parker',
        email: 'peter@parker.com',
        password: 'supersecret'
      }
    end
  
    def valid_question(user_id)
      {
        title: "Compiler and interpreter",
        body: "What is the difference between compiler and interpreter?",
        user_id: user_id
      }
    end
  end