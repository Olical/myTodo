define([
    'models/Todo'
], function(Todo) {
    // This collection holds all todos
    // This is what is written to localStorage
    var TodoList = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Store('todos'),

        comparator: function(todo) {
            // By specifying the created date as the comparator
            // All todos are ordered by created date
            return todo.get('created');
        },

        done: function() {
            // Find all todos that are done and return them
            return this.filter(function(todo) {
                return todo.get('done');
            });
        },

        remaining: function() {
            // This returns all todos that are NOT done
            return this.without.apply(this, this.done());
        }
    });

    return TodoList;
});