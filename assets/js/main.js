$(function() {
    /*jshint jquery:true*/
    /*global Backbone:true,Store:true,_:true*/
    'use strict';

    var Todo = Backbone.Model.extend({
        defaults: function() {
            return {
                content: 'nothing to do here...',
                created: new Date().getTime(),
                done: false
            };
        },

        initialize: function() {
            if(!this.get('content')) {
                this.save({
                    content: this.defaults.content
                });
            }
        }
    });

    var TodoList = Backbone.Collection.extend({
        model: Todo,
        localStorage: new Store('todos'),

        comparator: function(todo) {
            return todo.get('created');
        }
    });

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

    var AppView = Backbone.View.extend({
        el: $('#todo-app'),
        events: {
            'click #create-todo': 'createTodo'
        },

        initialize: function(todos) {
            this.todos = todos;

            this.list = this.$('#todo-list');
            this.input = this.$('#todo-content');

            todos.bind('add', this.appendTodo, this);
            todos.bind('reset', this.appendAllTodos, this);
            todos.fetch();
        },

        createTodo: function() {
            var value = this.input.val();

            if(!value) {
                return false;
            }

            this.todos.create({
                content: value
            });

            this.input.val('');
        },

        appendTodo: function(todo) {
            var view = new TodoView({
                model: todo
            });
            this.list.append(view.render().el);
        },

        appendAllTodos: function() {
            this.list.html('');
            this.todos.each(this.appendTodo, this);
        }
    });

    var todos = new TodoList();
    var app = new AppView(todos);
});