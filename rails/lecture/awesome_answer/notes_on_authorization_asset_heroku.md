## Authorization
---------------------------------------
* Difference between Authentication and Authorization.
1. Add `gem 'cancancan', '~> 3.5'` to your gemfile and run `bundle` in console.
2. Run `rails g cancan:ability` and it will create a file like `app/models/ability.rb`.Have a look at the created file.
(If we run the application, it will give us error. We need to define has the authority to do what.)
* For more information check: https://github.com/CanCanCommunity/cancancan
* https://github.com/CanCanCommunity/cancancan/blob/develop/docs/define_check_abilities.md
-----------------------------------------
## Assests
1. Add the following the gemfile.
```
# Use Bootstrap 5
gem 'bootstrap', '~> 5.1'
# Use jQuery 
gem 'jquery-rails'
```

2. Run the following command in rails console. The files in assets will have direct access from the client.
'jquery-rails' gem makes it possible. Run `bundle open jquery-rails` to have a look at the file. 
```
Rails.application.config.assets.paths
```

3. Change the content of the applicaton.js, application.css, manifest.js; Add site.scss. Play around with different features of it.

4