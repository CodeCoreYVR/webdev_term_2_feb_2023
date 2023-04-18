require './cookie.rb'


class CookieBag

    attr_accessor :cookies

    def initialize
        @cookies = []
    end

    def add_cookie(cookie)
        if cookie.is_a?(Cookie)
            @cookies.push(cookie)
        else
            p "Not a cookie"
        end
        return self
    end

    def remove_cookie
        @cookies.pop
    end

    def details
        p "The bag has #{cookies.length} cookies."
        @cookies.map { |cookie|
            p "Cookie with #{cookie.flour} flour, and #{cookie.sugar} sugar"
        }
    end
end