define([
        "knockout",
        "pubsub"
    ],
    function (ko, pubsub) {

        var TODO_REMOVE_EVENT = "KO/todo/remove/item";

        var Todo = {

            init: function (title, completed) {

                this.title = ko.observable(title);
                this.completed = ko.observable(completed);
                this.editing = ko.observable(false);

                return this;
            },

            editItem: function () {

                this.editing(true);
            },

            remove: function () {

                pubsub.publish(TODO_REMOVE_EVENT, this);
            },

            stopEditing: function () {

                this.editing(false);

                var title = this.title().trim();

                if (typeof(title) === "string" && title.length > 0) {

                    this.title(title);

                } else {

                    this.remove();
                }
            }

        };

        return Todo;
    }
);