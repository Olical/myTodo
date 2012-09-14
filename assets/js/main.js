define([
    'collections/TodoList',
    'views/AppView'
], function(TodoList, AppView) {
    /*jshint jquery:true*/
    /*global Backbone:true,Store:true,_:true*/
    'use strict';

    $(function() {
        // Initialise the list and app
        // Pass the list reference through to the app
        var todos = new TodoList();
        var app = new AppView(todos);
    });
});