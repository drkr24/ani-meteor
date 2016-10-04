import 'reveal/theme/blood.css'

const WEBCAM_SWIPE_ENABLED = "webcamSwipeEnabled";
const MENU_BOTTOM_VISIBLE = "menuBottomVisible";
const MENU_BOTTOM_MAN = "menuBottomVisibleManually";

let pushBottom, displayFooterNote;

var closeMenu = function() {
    Session.set(MENU_BOTTOM_VISIBLE, false);
    Session.set(MENU_BOTTOM_MAN, false);
    pushBottom.close();
};

Template.present.created = function () {
    this.presentationName = this.data.name;
    this.theme = this.data.theme || "blood";
    Session.set(WEBCAM_SWIPE_ENABLED, false);
    Session.set(MENU_BOTTOM_VISIBLE, false);
    displayFooterNote = new ReactiveVar( true );

    this.data.copyLink = window.location.host + "/watch/" + Meteor.user().username;
};

Template.present.onRendered(function() {
    var that = this;
    Reveal.initialize();
    Reveal.addEventListener('slidechanged', function() {
        Meteor.call('userPresentations/update', Meteor.user().username, Reveal.getState());
    });

    pushBottom = new Menu({
        wrapper: '#reveal',
        type: 'push-bottom',
        menuOpenerClass: '.c-button',
        maskId: '#c-mask'
    });
    pushBottom.open();
    setTimeout(function() {
       pushBottom.close();
    }, 1000);
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
        closeMenu();
    }
});

Template.present.helpers({
    "cameraControlEnabled": function() {
        return Session.get(WEBCAM_SWIPE_ENABLED);
    },
    "displayFooterNote": function () {
        return displayFooterNote.get();
    }
});

Template.body.events({
    "keypress" : function (event) {
        if (Router.current() && Router.current().route.getName() === "present") {
            var key = event.which || event.keyCode;
            if (key === 109) {
                if (Session.get(MENU_BOTTOM_VISIBLE)) {
                    closeMenu();
                } else {
                    displayFooterNote.set(false);
                    Session.set(MENU_BOTTOM_MAN, true);
                    pushBottom.open();
                    Session.set(MENU_BOTTOM_VISIBLE, true);
                }

            }
        }
    },
    "mousemove": function(event) {
        if (Router.current() && Router.current().route.getName() === "present") {
            if (event.pageY > window.innerHeight - 50) {
                pushBottom.open();
                Session.set(MENU_BOTTOM_VISIBLE, true);
            } else {
                if (!Session.get(MENU_BOTTOM_MAN)) {
                    closeMenu();
                }
            }
        }
    }
});


Session.set("webcamSwipeEnabled", true);

Session.get("webcamSwipeEnabled");