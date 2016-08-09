Template.edit.rendered = function() {
    if (Session.get("animateChild")) {
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

Template.edit.events({
    "submit": function (event) {
        // Prevent default browser form submit
        event.preventDefault();
        console.log(this);
        console.log(Template.instance());
        const target = event.target;
        const slides = AceEditor.instance("slides").getValue();
        Meteor.call("presentations/update", target.title.value, AceEditor.instance("slides").getValue());
        setTimeout(function () {
            Router.go('home');
        }, 500);
    }
});
