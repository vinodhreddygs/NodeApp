
var fs = require('fs');
var path = require('path');
var Model = require('../../models');

export const create = (req, res, next) => {
  /* fs.readFile(path.join(path.resolve('.'), 'src', 'data.json'), 'utf8', (err, data) => {
     if (err) res.status(400).end();
     var parsedData = JSON.parse(data);
     var count = parsedData.books.length;
     req.body.id = ++count;
     parsedData.books.push(req.body);
 
     fs.writeFile(path.join(path.resolve('.'), 'src', 'data.json'), JSON.stringify(parsedData), (err) => {
       if (err) res.status(400).end();
       res.status(200).json(parsedData).end();
     });
   }); */
// var unique_user_Id
  Model.books.create({    
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    price: req.body.price

  })
    .then((books) => {
      books = books.get({ plain: true });//to get data object not in sequilize obj in console
      // console.log("books", books);
      res.status(200).json(books).end();
    })
    .catch((err) => {
      // console.log("Catch block", err);
      if (err) res.status(400).end();
    })
}


export const index = ({ querymen: { query, select, cursor } }, res, next) => {
  /* fs.readFile(path.join(path.resolve('.'), 'src', 'data.json'), 'utf8', (err, data) => {
     //console.log("data", data);
     if (err) res.status(400).end();
     // res.status(200).json(data).end();
     var parsedData = JSON.parse(data);
     res.status(200).json(parsedData).end();  */
  // });Model.findAll({
  //console.log("model",Model);
  Model.books.findAll({
    raw: true, //to get data object not sequilize obj while create use plain
    attributes: ['id', 'title', 'author', 'publisher', 'price']
  })
    .then((books) => {
      //console.log("books",books);
      res.status(200).json(books).end();
    })
    .catch((err) => {
      //console.log("Catch block", err);
      if (err) res.status(400).end();
    })


}

export const show = (req, res, next) => {
  //console.log("req params", req.params.bookId);
  // fs.readFile(path.join(path.resolve('.'), 'src', 'data.json'), 'utf8', (err, data) => {

  //     // console.log("data", data);
  //     var parsedData = JSON.parse(data);
  //     //console.log("parsed data", parsedData);
  //     //var result = parsedData.books.filter(book => book.id == req.params.bookId)[0];
  //     var matchedIndex = parsedData.books.findIndex((book) => book.id == req.params.bookId);
  //     var matchedItem = parsedData.books[matchedIndex];
  //     //console.log(result);
  //     /* console.log("req params", book); 
  //     console.log("length",data);
  //     for (var i = 0; i < data.books.length; i++) {
  //      console.log("length",data.books.length);
  //        if (data.books[i].id == req.params.bookId) {
  //          var result=data.books[i];
  //        }
  //      }*/
  //     if (err) res.status(400).end();
  //     res.status(200).json(matchedItem).end();
  //   });
  Model.books.find({
    raw: true, //to get data object not sequilize obj while create use plain
    attributes: ['id', 'title', 'author', 'publisher', 'price'],
    where: {
      id: req.params.bookId
    }
  })
    .then((books) => {
      //console.log("books",books);
      res.status(200).json(books).end();
    })
    .catch((err) => {
      //console.log("Catch block", err);
      if (err) res.status(400).end();
    })

}

export const getByTitle = (req, res, next) => {
  fs.readFile(path.join(path.resolve('.'), 'src', 'data.json'), 'utf8', (err, data) => {
    console.log("dataOfFile", data);
    var parsedData = JSON.parse(data);
    console.log("parsed data of file", parsedData);
    var result = parsedData.books.filter(book => book.title == req.params.bookTitle)[0];
    if (err) res.status(400).end();
    res.status(200).json(result).end();
  });
}

export const getByIdTitle = (req, res, next) => {
  fs.readFile(path.join(path.resolve('.'), 'src', 'data.json'), 'utf8', (err, data) => {
    console.log("dataOfFile", data);
    var parsedData = JSON.parse(data);
    console.log("parsed data of file", parsedData);
    var result = parsedData.books.filter(book => book.id == req.params.bookId && book.title == req.params.bookTitle)[0];
    if (err) res.status(400).end();
    res.status(200).json(result).end();
  });
  //  console.log("yes");
}


export const update = (req, res, next) => {
  /* fs.readFile(path.join(path.resolve('.'), 'src', 'data.json'), 'utf8', (err, data) => {
     if (err) res.status(400).end();
     var parsedData = JSON.parse(data);
     var index = parsedData.books.findIndex(x => x.id == req.params.bookId);
 
     console.log("index", index);
     if (index > -1) {
       var result = parsedData.books[index];
       console.log("req body", req.body);
       console.log("result", result);
       console.log("available keys in body", Object.keys(req.body));
       console.log("available values in body", Object.values(req.body));
       console.log("available entries in body", Object.entries(req.body));
       console.log("Object before adding", result);
       var entries = Object.entries(req.body);
       // entries.forEach((item)=>{
       //   //console.log(item);
       //   var key= item[0];
       //   var value=item[1];
       //   result[key]=value;
       // })
       for (let i = 0; i < entries.length; i++) {
         console.log("Entry", entries[i]);
         var entryItem = entries[i];
         var key = entryItem[0];
         console.log("key", key);
         var value = entryItem[1];
         console.log("value", value);
         result[key] = value;
       }
       console.log("Final obj", result);
       // for(var item in entries){
       //   console.log(item);
       // }
 
       // Object.entries(req.body);
       //r Object.keys(req.body);
       //Object.values(req.body);
 
 
       // result.price = req.body.price;
       // result.title = req.body.title;
       // result.author = req.body.author;
       // result.publisher = req.body.publisher;
       // console.log("parsedData", parsedData);
       parsedData.books.splice(index, 1, result);
       console.log("parsedData", parsedData);
       fs.writeFile(path.join(path.resolve('.'), 'src', 'data.json'), JSON.stringify(parsedData), (err) => {
         if (err) res.status(400).end();
         res.status(200).json(parsedData).end();
       });
     } else {
       res.status(400).json({ error: "Item not found" }).end();
     }
   }); */
  // console.log("req.body..", req.body);
  // const newData = {  
  //   title: req.body.title,
  //   author: req.body.author,
  //   publisher: req.body.publisher,
  //   price: req.body.price
  // };



  // Model.books.update(newData, {where: { id:req.params.bookId } })
  //   .then((books) => {
  //     console.log("books",books);
  //     res.status(200).json(books).end();
  //   })
  //   .catch((err) => {
  //     console.log("Catch block", err);
  //     if (err) res.status(400).end();
  //   })
  Model.books.update({
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    price: req.body.price,
  }, {
      where: {
        id: req.params.bookId
      }
    })
    .then((books) => {
      console.log("books", books);
      res.status(200).json(books).end();
    })
    .catch((err) => {
      //console.log("Catch block", err);
      if (err) res.status(400).end();
    })

}


export const destroy = (req, res, next) => {
  /*  fs.readFile(path.join(path.resolve('.'), 'src', 'data.json'), 'utf8', (err, data) => {
      if (err) res.status(400).end();
      var parsedData = JSON.parse(data);
  
      var index = parsedData.books.findIndex(x => x.id == req.params.bookId);
  
      console.log("index", index);
      if (index > -1) {
        parsedData.books.splice(index, 1);
      } else {
        res.status(400).json({ error: "Item not found" }).end();
      }
  
  
      fs.writeFile(path.join(path.resolve('.'), 'src', 'data.json'), JSON.stringify(parsedData), (err) => {
        if (err) res.status(400).end();
        res.status(200).json(parsedData).end();
      });
    }); */

  Model.books.destroy({
    
    where: {
      id: req.params.bookId
    }
  })
    .then((books) => {
      //console.log("books",books);
      res.status(200).json(books).end();
    })
    .catch((err) => {
      //console.log("Catch block", err);
      if (err) res.status(400).end();
    })
}

