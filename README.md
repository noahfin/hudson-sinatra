# hudson-sinatra
This is an app to build markting list's of companies base on geographical location and bussiness types. It using ruby and [Sinatra](http://www.sinatrarb.com/) for the backdend and javascript with [Google places ](https://developers.google.com/places/) API to make the magic happen on the front-end.

## Running Locally

Make sure you have [Ruby](https://www.ruby-lang.org), [Bundler](http://bundler.io) installed.

```sh
git clone git@github.com:nonothetoad/hudson-sinatra.git # or clone your own fork
cd hudson-sinatra
bundle

```
Then you have to get an [API KEY](https://developers.google.com/places/android-api/signup).

```sh
open ~/.bash_profile

```
At the bottom of the document add.
```
export PLACES_KEY="YOUR API KEY PAST INSIDE THE QUOTES"

```
Save the file and quit.

```sh
rackup -p 3000

```
Your app should now be running on [localhost:3000](http://localhost:3000/).

## Deploying to Heroku

```
heroku create
git push heroku master
heroku run rake db:migrate
heroku open
```
remember you will need to add your api key to heroku.
