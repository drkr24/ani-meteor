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
        var current = UserPresentations.findOne({"username" : username, "presentationName" : presentationName, 'isRunning' : true});
        UserPresentations.update(current._id, {
            $set: { 'state': state },
        });
    }
});
