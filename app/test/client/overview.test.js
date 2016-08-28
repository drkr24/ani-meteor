import { Factory } from 'meteor/dburles:factory';
import { assert } from 'meteor/practicalmeteor:chai';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { withRenderedTemplate } from '../test-helpers';
import "../../client/templates/overview.js";

import { Presentations } from "../../lib/collections";

describe('overview', function () {


    Factory.define('presentation', Presentations, {
        slides: () => "<section>Test data</section>",
        name: () => "sample presentation name",
        username: () => "username",
        created: () => new Date()
    });

    beforeEach(function () {
        Template.registerHelper('_', key => key);
        Template.registerHelper('formatDate', date => date);
    });

    afterEach(function () {
        Template.deregisterHelper('_');
        Template.deregisterHelper('formatDate');
    });

    it('renders correctly list of presentations', function () {
        const presentation1 = Factory.build('presentation');
        const presentation2 = Factory.build('presentation');

        withRenderedTemplate('overview', {presentations: [presentation1, presentation2]}, el => {
            assert.equal($(el).find('.presentation-section').length, 2);
        });
    });

    it('renders correctly sample presentation', function () {
        const presentation = Factory.build('presentation');

        withRenderedTemplate('presentation', presentation, el => {
            assert.equal($(el).find('.pres-title').text(), presentation.name);
        });
    });
});