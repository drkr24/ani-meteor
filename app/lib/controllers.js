import { Presentations } from "./collections"

HomeController = RouteController.extend({
    onBeforeAction: function () {
        this.redirect('/dashboard/overview');
    }
});

LoginController = RouteController.extend({
    onBeforeAction: function () {
        this.next();
    }
});

OverviewController = RouteController.extend({
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