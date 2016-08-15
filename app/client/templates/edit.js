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

        const title = event.target.title.value;
        const slides = AceEditor.instance("slides").getValue();
        console.log('slides', slides);
        Meteor.call("presentations/update", this._id, title, slides,
            function (error) {
                if (error) {
                    alert(error.reason);
                } else {
                    setTimeout(function () {
                        Router.go('home');
                    }, 500);
                }
            }
        );

    }
});
