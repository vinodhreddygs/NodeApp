var Model = require('../models');

exports.create = function (x) {
    // console.log("req.body", x)
    return Model.books.create({
        title: x.title,
        author: x.author,
        publisher: x.publisher,
        price: x.price

    })
        .then((books) => {
            return books;
        })
        .catch((err) => {
            throw err;
        })
}

exports.getAllBooks = function () {
    return Model.books.findAll({
        raw: true, //to get data object not sequilize obj while create use plain
        attributes: ['id', 'title', 'author', 'publisher', 'price']
    })
        .then((books) => {
            return books;
        })
        .catch((err) => {
            throw err;
        })
}

exports.getBookById = function (id) {
    return Model.books.find({
        raw: true, //to get data object not sequilize obj while create use plain
        attributes: ['id', 'title', 'author', 'publisher', 'price'],
        where: {
            id: id
        }
    })
        .then((book) => {
            return book;
        })
        .catch((err) => {
            throw err;
        })
}

exports.update = function (x, id) {
    console.log("req.body", x)
    return Model.books.update({
        title: x.title,
        author: x.author,
        publisher: x.publisher,
        price: x.price,
    }, {
            where: {
                id: id
            }
        })
        .then((books) => {
            return books;
        })
        .catch((err) => {
            throw err;
        })
}

exports.delete = function (id) {
    return Model.books.destroy({

        where: {
            id: id
        }
    })
        .then((books) => {
            return books;
        })
        .catch((err) => {
            throw err;
        })
}



