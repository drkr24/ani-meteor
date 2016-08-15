/*****************************************************************************/
/*  Client and Server Methods */
/*****************************************************************************/
PRESENTATION_PATTERN = /^(\s*(<!--.+-->)*\s*<section.*>(.*\s*)+?<\/section>(\s*(<!--.+-->)*))+$/ig;

Meteor.methods({
  'lib/method_name': function () {
    
    if (this.isSimulation) {
    //   // do some client stuff while waiting for
    //   // result from server.
    //   return;
    }
    // server method logic
  },
  'validate/slides' : function(slides) {
    return PRESENTATION_PATTERN.test(slides);
  }
});


