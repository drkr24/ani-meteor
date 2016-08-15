import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

if (Meteor.isServer) {
    describe('UserPresentations method', () => {

        const username = "testUserName",
            newPresName = "newPresName",
            existingPresName = "existingPresName";
        let existingPres;

        beforeEach(() => {
            UserPresentations.remove({});
            existingPres = UserPresentations.insert({
                "username": username,
                "presentationName": existingPresName,
                "isRunning" : true
            });
        });

        it('should mark chosen presentation as running', () => {

            const insertPresTask = Meteor.server.method_handlers['userPresentations/insert'];

            insertPresTask.apply({}, [username, newPresName]);

            const existingPres = UserPresentations.findOne({"presentationName" : existingPresName});
            const runningPres = UserPresentations.findOne({"username" : username, "isRunning" : true});

            assert.equal(runningPres.presentationName, newPresName);
            assert.isFalse(existingPres.isRunning);
        });
    });
}