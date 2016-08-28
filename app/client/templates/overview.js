import "./overview.html"

Template.overview.rendered = function() {
	if (Session.get("animateChild")) {
		$(".overview-page").addClass("ng-enter");
		setTimeout(function(){
			$(".overview-page").addClass("ng-enter-active");
		}, 300);
		setTimeout(function(){
			$(".overview-page").removeClass("ng-enter");
			$(".overview-page").removeClass("ng-enter-active");
		}, 600);
	}
};

Template.presentation.events({
	'click .remove' () {
		Meteor.call("presentations/remove", this._id);
	}
});