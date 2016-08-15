Router.route('home', {
    path: '/',
    onBeforeAction: function() {
        this.redirect("overview");
    }
});

Router.route('overview', {
    layoutTemplate: 'dashboard',
    path: '/overview'
});

Router.route('present', {
    //layoutTemplate: 'wrapper',
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
    onRendered: function () {
        Meteor.call("userPresentations/insert", Meteor.user().username, this.params._name);
        console.log("Presenting " + this.params._name + " by: " + Meteor.user().username);
        this.next();
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

Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/login');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    except: ['login', 'watch']
});