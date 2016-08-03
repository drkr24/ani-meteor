Router.route('home', {
    path: '/'
});

Router.route('dashboard', {
    path: '/dashboard'
});

Router.route('overview', {
    layoutTemplate: 'dashboard',
    path: '/dashboard/overview'
});

Router.route('present', {
    path: '/present/:_name',
    onBeforeAction: function() {
        if (!Meteor.user()) {
            if (!Meteor.loggingIn()) {
                this.redirect("/login");
            }
        }
        this.next();
    },
    waitOn: function () {
        return Meteor.subscribe('presentationDetails', this.params._name);
    },
    data: function () {
        return Presentations.findOne();
    },
    onRun: function () {
        Meteor.call("userPresentations/insert", Meteor.user().username, this.params._name);
        console.log("Presenting " + this.params._name + " by: " + Meteor.user().username);
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

Router.route('reports', {
    layoutTemplate: 'dashboard',
    path: '/dashboard/reports'
});

Router.route('login', {
    path: '/login'
});
