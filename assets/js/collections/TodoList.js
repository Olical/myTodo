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
        }
    });

    return TodoList;
});