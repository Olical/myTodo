define(function() {
    $(function() {
        /*jshint jquery:true*/
        /*global Backbone:true,Store:true,_:true*/
        'use strict';

        // Todo model
        // Stores the data for each todo
        var Todo = Backbone.Model.extend({
            defaults: function() {
                // These are the default values
                // The created field is set to the time at which the todo was created
                // The created date is used for ordering
                return {
                    content: 'nothing to do here...',
                    created: new Date().getTime(),
                    done: false
                };
            },

            initialize: function() {
                // On creation, if there is no content then it is set to the default
                // This stops blank content fields
                if(!this.get('content')) {
                    this.save({
                        content: this.defaults.content
                    });
                }
            }
        });

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

        // Individual list item todos
        // Renders to an actual <li> tag
        // Updates on change
        var TodoView = Backbone.View.extend({
            tagName: 'li',
            template: _.template($('#todo-template').html()),

            initialize: function() {
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
            },

            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        // The main app view the encapsulates everything
        // Manages the creation of todos among many other things
        // Basically the box that the list sits in
        var AppView = Backbone.View.extend({
            el: $('#todo-app'),
            events: {
                'click #create-todo': 'createTodo'
            },

            initialize: function(todos) {
                this.todos = todos;

                this.list = this.$('#todo-list');
                this.input = this.$('#todo-content');

                // When any are added or the list needs completely building
                // Run the appending methods that render and add the elements
                todos.bind('add', this.appendTodo, this);
                todos.bind('reset', this.appendAllTodos, this);

                // Load the old data from localStorage
                // Copied into the TodoList instance
                todos.fetch();
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

        // Initialise the list and app
        // Pass the list reference through to the app
        var todos = new TodoList();
        var app = new AppView(todos);
    });
});