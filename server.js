var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config = {
    user:'parthkhunteta96',
    database:'parthkhunteta96',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};




var app = express();
app.use(morgan('combined'));

var articles={
'article-one':{

    title:'article one |parth khunteta',
    heading:'article one',
    date:'19 august 2017',
    content:`
    <p>
                this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article 
            </p>
            <p>
                  this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article 
            </p>
            <p>
                this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article this is the content for  my first article 
            </p>
    `
            

},
'article-two':{
     title:'article two |parth khunteta',
    heading:'article two',
    date:'20 august 2017',
    content:`
            <p>
               YO YO YO ARTICLE TWO
               
            </p>
        `    
            
},
'article-three':{
    title:'article three |parth khunteta',
    heading:'article three',
    date:'21 august 2017',
    content:`
           <p>
               YO YO YO ARTICLE Three
               
            
            </p>
            `
}
};



function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var date=data.date;
var htmlTemplate=`
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name ="viewport" content="width=device_width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
           </head>
    
    <body>
        <div class="container">
        <div>
            <a href="/"> home </a>
        </div>
        <hr/>
        <h3>
            ${heading} 
        </h3>
        <div>
            ${date}
        </div>
        <div>
           ${content}
        </div>
        </div>
    </body>
    </html>
`; 
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


 var Pool = new Pool(config);
 app.get('/test-db', function(req,res){
     
    Pool.query('SELECT * FROM test',function(err,result){
        if(err){
           
           res.ststus(500).send(err.toString());
       } 
       else{
           res.send(JSON.stringify(result));
       }
       
       
    }); 
 });
 
 
 
 var counter=0;
app.get('/counter',function(req,res)

{ counter=counter+1;
  res.send(counter.toString());
    
});

var names=[];
app.get('/submit-name',function(req,res)
{
   var name=req.query.name;
   
   
   names.push(name);
   
   
   
   res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res)
{

    Pool.query("SELECT * FROM article WHERE title =" + req.params.articleName, function(err,result){
    
    if(err){
           
           res.ststus(500).send(err.toString());
       } 
       else{
           if(result.rows.length===0){
           res.status(404).send('article not found');
           }
          else
          {
           var articleDATA=result.rows[0];
           res.send(createTemplate(articleData));
           
              
          }
           
       }

    });
  res.send(createTemplate(articleData));  
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});





// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
