var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

exports.create = function (req, res) {
    new Todo({
        content: req.body.content,
        updated_at: Date.now()
    }).save(function (err, todo, count) {
            res.redirect('/');
        });
};
exports.destroy = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        todo.remove(function (err, todo) {
            res.redirect('/');
        });
    });
};
exports.index = function (req, res) {
    Todo.
        find().
        sort('-updated_at').
        exec(function (err, todos) {
            res.render('index', {
                title: 'Express Todo Example',
                todos: todos
            });
        });
};

exports.edit = function (req, res) {
    Todo.
        find().
        sort('-updated_at').
        exec(function (err, todos) {
            res.render('edit', {
                title: 'Express Todo Example',
                todos: todos,
                current: req.params.id
            });
        });
};
exports.update = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        todo.content = req.body.content;
        todo.updated_at = Date.now();
        todo.save(function (err, todo, count) {
            res.redirect('/');
        });
    });
};
exports.current_user = function (req, res, next) {
    if (!req.cookies.user_id) {
        res.cookie('user_id', utils.uid(32));
    }
    next();
};