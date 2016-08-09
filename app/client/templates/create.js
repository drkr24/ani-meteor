Template.create.rendered = function() {
	if(Session.get("animateChild")){
		$(".reports-page").addClass("ng-enter");
		setTimeout(function(){
			$(".reports-page").addClass("ng-enter-active");
		}, 300);
		setTimeout(function(){
			$(".reports-page").removeClass("ng-enter");
			$(".reports-page").removeClass("ng-enter-active");
		}, 600);
	}

	AceEditor.instance("slides", {
		theme:"dawn",
		mode:"html"
	});
};

Template.create.events({
	"submit": function (event) {
		// Prevent default browser form submit
		event.preventDefault();
		const target = event.target;
		const slides = AceEditor.instance("slides").getValue();
		Meteor.call("presentations/insert", target.title.value, AceEditor.instance("slides").getValue());

		setTimeout(function () {
			Router.go('home');
		}, 500);
	}
});
