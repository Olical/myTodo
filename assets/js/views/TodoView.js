define(function() {
    // This is the state enum
    // It lets the application know what state the view is in
    var states = {
        normal: 0,
        editing: 1
    };

    // Individual list item todos
    // Renders to an actual <li> tag
    // Updates on change
    var TodoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#todo-template').html()),
        editTemplate: _.template($('#edit-todo-template').html()),
        state: states.normal,
        events: {
            'click .toggle': 'toggleDone',
            'click .destroy': 'destroy',
            'click .begin-edit': 'beginEdit',
            'click .cancel-edit': 'cancelEdit',
            'click .save-edit': 'saveEdit'
        },

        initialize: function() {
            // Rebuild the HTML if the models data changes
            this.model.bind('change', this.render, this);

            // If the model is destroyed then remove the element
            this.model.bind('destroy', this.remove, this);

            // Render the view when the state changes
            this.bind('state:change', this.render, this);
        },

        render: function() {
            // Renders the element from the models data
            // It uses a different template depending on the state
            if(this.state === states.normal) {
                // The data is cleaned by converting it to JSON
                this.$el.html(this.template(this.model.toJSON()));
            }
            else if(this.state === states.editing) {
                this.$el.html(this.editTemplate(this.model.toJSON()));
            }

            return this;
        },

        setState: function(state) {
            // Sets a new state and triggers the event
            this.state = state;
            this.trigger('state:change');
        },

        beginEdit: function() {
            // Swap into the editing state
            this.setState(states.editing);
        },

        cancelEdit: function() {
            // Drop out of the editing state without saving
            this.setState(states.normal);
        },

        saveEdit: function() {
            // Save and exit the editing state
            this.model.save({
                content: this.$('.edited').val()
            });
            this.cancelEdit();
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