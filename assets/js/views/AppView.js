define([
    'views/TodoView',
    'collections/TodoList'
], function(TodoView, TodoList) {
    // The main app view the encapsulates everything
    // Manages the creation of todos among many other things
    // Basically the box that the list sits in
    var AppView = Backbone.View.extend({
        el: $('#todo-app'),
        events: {
            'click #create-todo': 'createTodo'
        },

        initialize: function() {
            this.todos = new TodoList();

            this.list = this.$('#todo-list');
            this.input = this.$('#todo-content');

            // When any are added or the list needs completely building
            // Run the appending methods that render and add the elements
            this.todos.bind('add', this.appendTodo, this);
            this.todos.bind('reset', this.appendAllTodos, this);

            // Load the old data from localStorage
            // Copied into the TodoList instance
            this.todos.fetch();
        },

        createTodo: function() {
            // Extracts and checks for a value
            var value = this.input.val();

            if(!value) {
                return false;
            }

            // When it exists, a todo is created with the value as it's content
            this.todos.create({
                content: value
            });

            // And then it is emptied to be used again
            this.input.val('');
        },

        appendTodo: function(todo) {
            // Creates a new view with the specified model
            var view = new TodoView({
                model: todo
            });

            // And appends its rendered DOM element to the ul
            this.list.append(view.render().el);
        },

        appendAllTodos: function() {
            // Empties the ul
            this.list.html('');

            // And then renders each of the todos in turn
            // The ordering is based on the created timestamp
            this.todos.each(this.appendTodo, this);
        }
    });

    return AppView;
});