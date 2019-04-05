import { Meteor } from 'meteor/meteor';
import "../imports/api/Song.js";
import "../imports/api/Methods.js";

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
          'secret': '7002d1c4c3b449d79a4f484bb27ee893'
        }
      },
      { upsert: true }
    );
  
});