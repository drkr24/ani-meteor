// import 'reveal/theme/blood.css'
import { UserPresentations } from "../../lib/collections"

Template.observe.onCreated(function() {
    var instance = this;
    var presentationOwner = this.data.username;
    instance.state = null;

    instance.autorun(function () {

        var subscription = Meteor.subscribe('userPresentationsDetails', presentationOwner);
        if (subscription.ready()) {
            var pres = UserPresentations.findOne({'username': presentationOwner, 'isRunning': true});
            if (pres) {
                Reveal.setState(pres.state);
            }
        }
    });
});

Template.observe.onRendered( function() {
    Reveal.initialize();
});