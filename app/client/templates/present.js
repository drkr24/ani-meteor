import 'reveal/theme/blood.css'

Template.present.created = function () {
    this.presentationName = this.data.name;
};

Template.present.onRendered(function() {
    var that = this;
    Reveal.initialize();
    Reveal.addEventListener( 'slidechanged', function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        Meteor.call('userPresentations/update', Meteor.user().username, that.presentationName, Reveal.getState())
    });
});