if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Presentations.find().count() > 0) {
            console.log('there are some presentations in db, skipping for now');
            return;
        }

        Assets.getText('SamplePres.html', function(err, data) {

            console.log('==> insert sample presentation');
            Presentations.insert({
                'name' : 'SamplePres',
                'username' : 'mehowthe',
                'created' : new Date(),
                'slides' : data
            });
        });

    });
}