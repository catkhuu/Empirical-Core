# If you are having any trouble installing, please post your questions here:
http://empirical-discourse.herokuapp.com/t/quill-installation-guide

* * *

[![Code Climate](https://codeclimate.com/github/empirical-org/quill.png)](https://codeclimate.com/github/empirical-org/quill)
[![Build Status](https://travis-ci.org/empirical-org/quill.png)](https://travis-ci.org/empirical-org/quill)
[![Coverage Status](https://coveralls.io/repos/empirical-org/quill/badge.png?branch=master)](https://coveralls.io/r/empirical-org/quill?branch=master)
[![Dependency Status](https://gemnasium.com/empirical-org/quill.png)](https://gemnasium.com/empirical-org/quill)

### Building:

Unless stated otherwise, all commands assume that your current working
directory is the quill application root.

0.  Set up an [RVM](http://rvm.io) environment.

    *Note*: You *do not* have to do this, but can be helpful if you work with
    multiple Ruby projects. See the [RVM home page for more details](http://rvm.io).

        rvm install 1.9.3
        rvm gemset create quill
        echo "1.9.3" >> .ruby-version
        echo "quill" >> .ruby-gemset

1.  Install dependencies.

        bundle install

    *Note*: This may require you to install missing system packages using your
    system package handler (`apt`, `yum`, etc.).

2.  Set up your database configuration by creating and editing the file
    `config/database.yml` with appropriate connection information. Example
    information is provided below.

        development:
            host: localhost
            adapter: postgresql
            encoding: unicode
            database: <database_name>
            pool: 5
            username: my_name
            password: my_pass

3.  Build the database structure.

        sudo service postgres start   # may change depending on your OS

        rake db:create
        rake db:schema:load

4.  Seed data into the database. 

        rake db:seed
        
    If you are granted access to a Heroku environment, you can also capture a
    database directly from that. Instructions below are for example only.

        heroku pg:capture --app <app>
        curl -o ~/latest.dump $(heroku pgbackups:url --app <app>)
        pg_restore --verbose --clean --no-acl --no-owner -h localhost -U <your_db_user> -d <database_name> ~/latest.dump
    
    *Note*: `<app>` is the name of the Quill deploy app on Heroku you want to
    retrieve data from.

5.  Create a `.ruby-env` file in the project root and define necessary
    environment values.

        echo "RAILS_ENV=development
        APP_SECRET=your-secret-key
        HOMEPAGE_CHAPTER_ID=1" >> ./.ruby-env

    *Note*: You may need to cd out and back into the app root for these
    environment changes to apply.

        cd ~; cd -;

6.  Start the app, make sure it works.

        rails server
        curl localhost:3000

### Contributing:

Full explanation in CONTRIBUTING.md

1.  Make sure your code follows ruby and project conventions.
2.  Make sure you don't have any IDE / platform specific files committed. i.e. .DS_Store, .idea, .project (consider adding these to your global gitignore).
3.  Run `rake`, make sure everything passes.
4.  Open a pull request.

### Benchmarking:

```
user = User.first
user.refresh_token!
token = user.token

$ ab -H "Authorization: Basic `echo TOKEN_GOES_HERE: | base64`==" -n 5 -c 1 http://www.quill.org/profile
```

IRC
---
We are on Freenode, just join #empirical-quill.
