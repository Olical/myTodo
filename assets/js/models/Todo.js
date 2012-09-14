define(function() {
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
        },

        toggleDone: function() {
            this.save({
                done: !this.get('done')
            });
        }
    });

    return Todo;
});