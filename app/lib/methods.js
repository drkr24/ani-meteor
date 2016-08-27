PRESENTATION_PATTERN = /^(\s*(<!--.+-->)*\s*<section.*>(.*\s*)+?<\/section>(\s*(<!--.+-->)*))+$/ig;

Meteor.methods({
  'validate/slides' : function(slides) {
    return PRESENTATION_PATTERN.test(slides);
  }
});


