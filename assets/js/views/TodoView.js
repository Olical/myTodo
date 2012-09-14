define(function() {
    // Individual list item todos
    // Renders to an actual <li> tag
    // Updates on change
    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#todo-template').html()),
        events: {
            'click .toggle': 'toggleDone'
        },

        initialize: function() {
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        toggleDone: function() {
            this.model.toggleDone();
        }
    });

    return TodoView;
});