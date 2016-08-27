Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.registerHelper("asJSON", function (obj) {
    return JSON.stringify(obj);
});


Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY HH:mm');
});