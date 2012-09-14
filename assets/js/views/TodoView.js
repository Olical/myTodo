define(function() {
    // Individual list item todos
    // Renders to an actual <li> tag
    // Updates on change
    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#todo-template').html()),
        events: {
            'click .toggle': 'toggleDone',
            'click .destroy': 'destroy'
        },

        initialize: function() {
            // Rebuild the HTML if the models data changes
            this.model.bind('change', this.render, this);

            // If the model is destroyed then remove the element
            this.model.bind('destroy', this.remove, this);
        },

        render: function() {
            // Renders the element from the models data
            // The data is cleaned by converting it to JSON
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        toggleDone: function() {
            // Simply toggles the done flag on the model
            // Because it fires the change event the element will be rendered
            this.model.toggleDone();
        },

        destroy: function() {
            // Destroys the models data which causes the element to be removed
            this.model.destroy();
            return false;
        }
    });

    return TodoView;
});