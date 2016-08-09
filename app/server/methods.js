/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
    'userPresentations/insert': function (username, presentationName) {
        console.log("*** called: userPresentations/insert", username, presentationName);
        var latest = UserPresentations.findOne({"username" : username, "isRunning" : true});
        if (latest) {
            console.log("update latest to not running");
            UserPresentations.update(latest._id, {
                $set: { isRunning: false },
            });
        }
        UserPresentations.insert({"username": username, "presentationName": presentationName, "isRunning" : true});
    },
    'userPresentations/update': function (username, presentationName, state) {
        console.log("*** called: userPresentations/update", username, presentationName, state);
        const current = UserPresentations.findOne({"username" : username, "presentationName" : presentationName, 'isRunning' : true});
        UserPresentations.update(current._id, {
            $set: { 'state': state },
        });
    },
    'presentations/insert' : function(title, slides) {
        console.log("*** called: presentations.insert", title, slides);
        Presentations.insert({
            'name' : title,
            'username' : Meteor.user().username,
            'created' : new Date(),
            'slides' : slides
        });
    },
    'presentations/update' : function(id, title, slides) {
        console.log("*** called: presentations.insert", title, slides);
        const pres = Presentations.findOne({_id: id});
        if (pres.username === Meteor.user().username) {
            Presentations.update(id, {
                $set: {
                    name: title,
                    slides: slides,
                    updated: new Date()
                },
            });
        }
    },
    'presentations/remove' : function(id) {
        console.log("*** called: presentations.remove", id);
        const pres = Presentations.findOne({_id: id});
        console.log(pres);
        if (pres.username === Meteor.user().username) {
            Presentations.remove(id);
        }
    }
});
