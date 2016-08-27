import { UserPresentations, Presentations } from "../lib/collections"

const methods = {
    'userPresentations/start': function (username, presentationName) {
        console.log("*** called: userPresentations/start", username, presentationName);
        var latest = UserPresentations.findOne({"username" : username, "isRunning" : true});
        if (latest) {
            console.log("update latest to not running");
            UserPresentations.update(latest._id, {
                $set: { isRunning: false }
            });
        }
        UserPresentations.insert({"username": username, "presentationName": presentationName, "isRunning" : true});
    },
    'userPresentations/update': function (username, state) {
        console.log("*** called: userPresentations/update", username, state);
        const current = UserPresentations.findOne({"username" : username, 'isRunning' : true});
        UserPresentations.update(current._id, {
            $set: { 'state': state }
        });
    },
    'presentations/insert' : function(title, slides) {
        console.log("*** called: presentations.insert", title, slides);
        if (Meteor.call('validate/slides', slides)) {
            Presentations.insert({
                'name': title,
                'username': Meteor.user().username,
                'created': new Date(),
                'slides': slides
            });
        }
    },
    'presentations/update' : function(id, title, slides) {
        console.log("*** called: presentations.insert", id, title, slides);
        const pres = Presentations.findOne({_id: id});
        if (Meteor.user() && pres && pres.username === Meteor.user().username) {
            if (Meteor.call('validate/slides', slides)) {
                console.log("*** validated successfully")
                Presentations.update(id, {
                    $set: {
                        name: title,
                        slides: slides,
                        updated: new Date()
                    }
                });
            } else {
                throw new Meteor.Error('presentations.update.invalid.input',
                    'Cannot edit presentation - wrong syntax');
            }
        } else {
            throw new Meteor.Error('presentations.update.unauthorized',
                'Cannot edit presentation that is not yours');
        }
    },
    'presentations/remove' : function(id) {
        console.log("*** called: presentations.remove", id);
        const pres = Presentations.findOne({_id: id});
        if (Meteor.user() && pres.username === Meteor.user().username) {
            Presentations.remove(id);
        } else {
            throw new Meteor.Error('presentations.remove.unauthorized',
                'Cannot remove presentation that is not yours')
        }
    }
};

Meteor.methods(methods);

export { methods };
