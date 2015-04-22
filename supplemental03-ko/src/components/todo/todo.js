define([
    'knockout',
    'pubsub',
    'model/todo',
    'text!./todo.html',
    'config/todo-handlers'
], function (ko, pubsub, Todo, templateMarkup) {

    'use strict';

    var LOCAL_STORAGE_ITEM = 'todos-knockout';

    var completedCount = function completedCountHandler () {

        return ko.utils.arrayFilter(this.todos(), function (todo) {
            return todo.completed();
        }).length;
    };

    var remainingCount = function remainingCountHandler () {

        return this.todos().length - this.completedCount();
    };

    var getLabel = function getLabelHandler () {

        return this.remainingCount() === 1 ? this.remainingCount() + ' item left' : this.remainingCount() + ' items left';
    };

    var add = function addHandler () {

        var current = this.current().trim();

        if (current.length > 0) {

            this.todos.push(Object.create(Todo).init(current));
            this.current("");
        }
    };

    var remove = function removeHandler (e, todo) {

        this.todos.remove(todo);
    };

    var removeCompleted = function removeCompletedHandler () {

        this.todos.remove(function (todo) {
            return todo.completed();
        });
    };

    var ViewModel = function () {

        var self = this;

        var todos = ko.utils.parseJson(window.localStorage.getItem(LOCAL_STORAGE_ITEM));

        this.todos = ko.observableArray(ko.utils.arrayMap(todos, function (todo) {
            return Object.create(Todo).init(todo.title, todo.completed);
        }));

        this.current = ko.observable();

        this.add = add.bind(this);
        this.removeCompleted = removeCompleted.bind(this);
        this.removeEvent = "KO/todo/remove/item";

        pubsub.subscribe(this.removeEvent, remove.bind(this));

        this.completedCount = ko.pureComputed(completedCount, this);
        this.remainingCount = ko.pureComputed(remainingCount, this);
        this.getLabel = ko.pureComputed(getLabel, this);

        this.allCompleted = ko.pureComputed({

            //always return true/false based on the done flag of all to-dos
            read: function () {
                return !self.remainingCount();
            },

            // set all to-dos to the written value (true/false)
            write: function (value) {
                ko.utils.arrayForEach(self.todos(), function (todo) {

                    todo.completed(value);
                });
            },

            owner: this
        });

        // internal computed observable that fires whenever anything changes in our to-dos
        ko.computed(function () {
            // store a clean copy to local storage, which also creates a dependency on the observableArray and all observables in each item
            window.localStorage.setItem(LOCAL_STORAGE_ITEM, ko.toJSON(self.todos));
        }).extend({
            rateLimit: {timeout: 500, method: 'notifyWhenChangesStop'}
        });
    };

    return {viewModel: ViewModel, template: templateMarkup};
});