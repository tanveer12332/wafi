var express = require('express');
var app = express();
var mongojs =  require('mongojs');
var bodyParser =  require('body-parser');
var db =mongojs('contactlist', ['contactlist']);
app.use(express.static("./public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req,res){
   console.log('i received contactlist request');
  db.contactlist.find(function(err,docs){
      console.log(docs);
    res.json(docs);
  })
   
})
app.post('/savecontactlist', function(req,res){

    db.contactlist.insert(req.body, function(err,doc){
         console.log(res.json(doc));
    })
   

})
 app.get('/editcontactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/updatecontactlist/:id', function(req,res){
    var id = req.params.id;
    console.log(req.body.pic)
    db.contactlist.findAndModify({
        query:{_id:mongojs.ObjectId(id)},
        update: {$set:{name:req.body.name,phone:req.body.phone,qty:req.body.qty,pic:req.body.pic}},
        new: true},function(err,doc){
            res.json(doc);
        }
        )
});
 

app.delete('/deletecontactlist/:id', function(req,res){
    var id = req.params.id;
    db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    })
  
})







///server setting 
var port= process.env.PORT || 3000;
var server = app.listen(port, () => {
	var listeningPort = server.address().port;
	console.log('The Server is listening on port: ' + listeningPort)
});