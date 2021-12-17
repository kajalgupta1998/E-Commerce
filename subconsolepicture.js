var express = require('express');
var router = express.Router();
var pool = require('./pool.js');
var upload = require('./upload.js');

/* GET home page. */
router.post('/addnewconsolepicture', upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var q="insert into subconsolepicture (categoryid,subcategoryid,image) values ?"
    pool.query(q,[req.files.map((items)=>
        [
        req.body.categoryid,
        req.body.subcategoryid,
        items.originalname
    ]),],
        function(error,result){
        if(error)
        {console.log(error)
            res.status(500).json({result:false})
        }
        else{
            res.status(200).json({result:true})
        }

    });

});


    router.post('/displayallproductpictures', function(req,res){
        console.log("Error",req.body)
        pool.query("select * from subconsolepicture where subcategoryid=?",[req.body.subcategoryid],function(error,result){
            if(error)
            {
                res.status(500).json([])
            }
            else
            {console.log(result)
                res.status(200).json(result)
            }
    
        });
    });


module.exports = router;



