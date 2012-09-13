$(function() {
    /*global Backbone:true,Store:true*/

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

    var TodoList = new Backbone.Collection.extend({
        model: Todo,
        localStorage: new Store('todos'),

        comparator: function(todo) {
            return todo.created;
        }
    });
});