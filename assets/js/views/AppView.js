define([
    'views/TodoView',
    'collections/TodoList'
], function(TodoView, TodoList) {
    /*jshint laxcomma:true*/

    // The main app view the encapsulates everything
    // Manages the creation of todos among many other things
    // Basically the box that the list sits in
    var AppView = Backbone.View.extend({
        el: $('#todo-app'),
        events: {
            'click #create-todo': 'createTodo',
            'click #toggle-all': 'toggleAll',
            'click #clear-done': 'clearDone'
        },

        initialize: function() {
            // Cause this.todos to contain the actual storage object
            // It is the interface to localStorage
            this.todos = new TodoList();

            // Fetch all elements
            // I don't want to be doing this over and over again
            this.list = this.$('#todo-list');
            this.toggleAllControl = this.$('#toggle-all');
            this.clearDoneButton = this.$('#clear-done');
            this.input = this.$('#todo-content');

            // When any are added or the list needs completely building
            // Run the appending methods that render and add the elements
            this.todos.bind('add', this.appendTodo, this);
            this.todos.bind('reset', this.appendAllTodos, this);

            // Rerender things like the toggle all box
            // I think this happens when ANYTHING changes
            // So on first run and when its children change
            this.todos.bind('all', this.render, this);

            // Load the old data from localStorage
            // Copied into the TodoList instance
            this.todos.fetch();
        },

        render: function() {
            // Fetch the counts of done and remaining todos
            var done = this.todos.done().length
              , remaining = this.todos.remaining().length;

            // If there are no todos remaining then tick the toggle all box
            // Untick it if not
            this.toggleAllControl.attr('checked', remaining === 0);
        },

        toggleAll: function() {
            // This sets all todos done flag to the state of the toggle all box
            var done = this.toggleAllControl.attr('checked');
            this.todos.each(function(todo) {
                todo.save({
                    done: done
                });
            });
        },

        clearDone: function() {
            _.each(this.todos.done(), function(todo) {
                todo.destroy();
            });
            return false;
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