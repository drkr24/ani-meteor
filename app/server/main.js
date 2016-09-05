import { Meteor } from 'meteor/meteor';
import { Presentations } from '../lib/collections';

Meteor.startup(() => {
    if (Presentations.find().count() > 0) {
        console.log('there are some presentations in db, skipping for now');
        return;
    }
    Assets.getText('SamplePres.html', function(err, data) {
        console.log('==> insert sample presentation');
        Presentations.insert({
            'name' : 'Praca magisterska',
            'username' : 'admin',
            'created' : new Date(),
            'slides' : data
        });
    });
    if (Meteor.users.find().count() == 0) {
        Accounts.createUser({
            "username" : "admin",
            "password": "puser"
        });
        console.log("created admin user");
    }
});