# COVID-19 Tracker

![Build and Deploy](https://github.com/krabfish/covid-19-tracker/workflows/Build%20and%20Deploy/badge.svg)

This is a simple global and country COVID-19 tracker. This small app uses an external API that exposes a `JSON` file. The
client-side JavaScript uses a `fetch()` to retrieve the `JSON` object and then pass the objects properties to the necessary
methods which will create the list items.

The app also utilizes the fuze library via CDN to allow for user search by country name or country code. In addition,
`parcel.js` is used to bundle the web app together and minification.


### Usage
```
git clone
cd covid-19-tracker
npm run start
```

Note: During any development it would be recommend to change the SASS variable `MODE` to development so that the `fetch()` 
uses the static JSON file instead of pinging the covid-19 API server.


## Have fun, stay safe, wear your mask!
