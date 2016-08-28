import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { expect } from 'meteor/practicalmeteor:chai';
import { UserPresentations } from "../../lib/collections"
import { methods } from "../../server/methods"

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

        // .. test setup //

        it('should mark chosen presentation as running', () => {

            methods["userPresentations/start"](username, newPresName);
            const existingPres = UserPresentations.findOne({"presentationName" : existingPresName});
            const runningPres = UserPresentations.findOne({"username" : username, "isRunning" : true});

            assert.equal(runningPres.presentationName, newPresName);
            assert.isFalse(existingPres.isRunning);
        });

    });
}