import 'reveal/theme/blood.css'

const WEBCAM_SWIPE_ENABLED = "webcamSwipeEnabled";
const MENU_BOTTOM_VISIBLE = "menuBottomVisible";

Template.present.created = function () {
    this.presentationName = this.data.name;
    this.theme = this.data.theme || "beige";
    Session.set(WEBCAM_SWIPE_ENABLED, false);
    Session.set(MENU_BOTTOM_VISIBLE, false);
};

Template.present.onRendered(function() {
    var that = this;
    Reveal.initialize();
    Reveal.addEventListener('slidechanged', function() {
        Meteor.call('userPresentations/update', Meteor.user().username, that.presentationName, Reveal.getState())
    });

    pushBottom = new Menu({
        wrapper: '#reveal',
        type: 'push-bottom',
        menuOpenerClass: '.c-button',
        maskId: '#c-mask'
    });
});

Template.present.events({
    "webcamSwipeRight" : function () {
        if (Session.get(WEBCAM_SWIPE_ENABLED)) {
            Reveal.navigateNext();
            // disable swiping for 1 second to avoid "double firing" of the event
            Session.set(WEBCAM_SWIPE_ENABLED, false);
            setTimeout(function(){ Session.set(WEBCAM_SWIPE_ENABLED, true)}, 1500);
        }
    },
    "webcamSwipeLeft" : function () {
        if (Session.get(WEBCAM_SWIPE_ENABLED)) {
            Reveal.navigatePrev();
            Session.set(WEBCAM_SWIPE_ENABLED, false);
            setTimeout(function(){ Session.set(WEBCAM_SWIPE_ENABLED, true)}, 1500);
        }
    },
    'click .toggle-camera' : function () {
        Session.set(WEBCAM_SWIPE_ENABLED, !Session.get(WEBCAM_SWIPE_ENABLED));
        if (Session.get(WEBCAM_SWIPE_ENABLED)) {
            Swiper.init(Template.instance().find("#reveal"));
        } else {
            Swiper.destroy();
        }
        Session.set(MENU_BOTTOM_VISIBLE, false);
        pushBottom.close();
    }
});

Template.present.helpers({
    "cameraControlEnabled": function() {
        return Session.get(WEBCAM_SWIPE_ENABLED);
    }
});

Template.body.events({
    "keypress" : function (event) {
        if (Router.current().route.getName() === "present") {
            var key = event.which || event.keyCode;
            if (key === 109) {
                if (Session.get(MENU_BOTTOM_VISIBLE)) {
                    pushBottom.close();
                    Session.set(MENU_BOTTOM_VISIBLE, false);
                } else {
                    pushBottom.open();
                    Session.set(MENU_BOTTOM_VISIBLE, true);
                }

            }
        }
    }
});