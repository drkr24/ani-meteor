import { Presentations } from "./collections"

Router.route('home', {
    path: '/',
    onBeforeAction: function() {
        this.redirect("overview");
        this.next();
    }
});

Router.route('overview', {
    layoutTemplate: 'dashboard',
    path: '/overview',
    waitOn: function() {
        return this.subscribe('presOverview');
    },
    data: {
        presentations: Presentations.find({})
    },
    onBeforeAction: function () {
        this.next();
    }
});

Router.route('present', {
    path: '/present/:_name',
    onBeforeAction: function() {
        if (!Meteor.user()) {
            if (!Meteor.loggingIn()) {
                this.redirect("/login");
            }
        }
        Meteor.call("userPresentations/start", Meteor.user().username, this.params._name);
        console.log("Presenting " + this.params._name + " by: " + Meteor.user().username);
        this.next();
    },
    waitOn: function () {
        return Meteor.subscribe('presentationDetails', this.params._name);
    },
    data: function () {
        return Presentations.findOne();
    }
});

Router.route('create', {
    layoutTemplate: 'dashboard',
    path: '/create'
});

Router.route('edit', {
    layoutTemplate: 'dashboard',
    path: '/edit/:_name',
    waitOn: function () {
        return Meteor.subscribe('presentationDetails', this.params._name);
    },
    data: function () {
        return Presentations.findOne();
    },
    onRun: function () {
        console.log("Edit presentation");
        this.next();
    }
});

Router.route('watch', {
    path: '/watch/:_username',
    waitOn: function () {
        return Meteor.subscribe('presentationDetailsByUser', this.params._username);
    },
    data: function () {
        return Presentations.findOne();
    },
    onRun: function () {
        console.log("Watch presentation");
        this.next();
    }
});


Router.route('login', {
    path: '/login'
});

Router.route('/loaderio-74f9ef6df48f8b9201f6f520b4797216', function () {
    var req = this.request;
    var res = this.response;
    res.end('loaderio-74f9ef6df48f8b9201f6f520b4797216');
}, {where: 'server'});

Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    except: ['login', 'watch', 'loaderio-74f9ef6df48f8b9201f6f520b4797216']
});