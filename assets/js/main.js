$(function() {
    /*global Backbone:true*/

    'use strict';

    var Todo = Backbone.Model.extend({
        defaults: function() {
            return {
                title: 'nothing to do here...',
                created: new Date().getTime(),
                done: false
            };
        },

        initialize: function() {
            if(!this.get('title')) {
                this.set({
                    title: this.defaults.title
                });
            }
        }
    });
});