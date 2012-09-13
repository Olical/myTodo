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
                this.set({
                    content: this.defaults.content
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

    var TodoView = new Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#todo-template').html()),

        render: function() {
            this.$el.html(this.template(this.model));
            return this;
        }
    });

    var AppView = new Backbone.View.extend({
        el: $('#todo-app'),
        events: {
            'click #create-todo': 'createTodo'
        },

        initialize: function(todos) {
            this.todos = todos;

            this.list = this.$('#todo-list');
            this.input = this.$('#todo-content');

            todos.bind('add', this.appendTodo, this);
            todos.fetch();
        },

        appendTodo: function(todo) {
            var view = new TodoView({
                model: todo
            });
            this.todoList.append(view.render().el);
        }
    });
});