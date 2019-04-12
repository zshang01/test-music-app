import { Meteor } from 'meteor/meteor';
import "../imports/api/Song.js";
import "../imports/api/Methods.js";
import "../imports/api/Users.js";

import { DDPRateLimiter } from "meteor/ddp-rate-limiter";
import { WebApp } from "meteor/webapp";

const LISTS_METHODS = [
  "displayGenres",
  "search",
  "searchSong"
];

// Only allow 5 list operations per connection per second

if (Meteor.isServer) {
  DDPRateLimiter.addRule(
    {
      name(name) {
        return LISTS_METHODS.includes(name);
      },

      // Rate limit per connection ID
      connectionId() {
        return true;
      }
    },
    5,
    1000
  );
}


WebApp.addHtmlAttributeHook(() => ({ lang: "en" }));

Meteor.startup(() => {
  // code to run on server at startup  

  // if (!process.env.BLENDIFY_SECRET) {
  //   console.log('******************************');
  //   console.log('[ERROR] Missing App Secret');
  //   console.log('******************************');
  // }
  // else {
    //Configure spotify service
    //Configure spotify service
    ServiceConfiguration.configurations.update(
      { 'service': 'spotify' },
      {
        $set: {
          'clientId': '6c4f45baec3f46ee85f42e07cf13836e',
          'secret': Meteor.settings.clientSecret
        }
      },
      { upsert: true }
    );
  
});