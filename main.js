var http = require('http');
var fs = require('fs');

var url = require('url');
function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

function templatelist(filelist){
  var list ='<ul>';
  var i=0;
  while (i<filelist.length) {
    list=list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i=i+1;
  }
  list= list+'</ul>';
  return list;
  /*
  var list=` <ul>
                <li><a href="/?id=HTML">HTML</a></li>
                <li><a href="/?id=CSS">CSS</a></li>
                <li><a href="/?id=JavaScript">JavaScript</a></li>
              </ul>`;
  */
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/'){
      if(queryData.id === undefined){

          fs.readdir('./data',function(error,filelist){
            console.log(filelist);
          var title='Welcome';
          var description= 'Hello, Node.js';

          var list= templatelist(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        })

      } else{
        fs.readdir('./data',function(error,filelist){
        var list ='<ul>';
        var i=0;
        while (i<filelist.length) {
          list=list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i=i+1;
        }
        list= list+'</ul>';

        fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
          var title = queryData.id;
          var template =`
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      });
      }
  } else {
    response.writeHead(404);
    response.end('Not Found');
  }

});
app.listen(3000);

//http://localhost:3000/?id=HTML
// window+R -> 살행 cmd -> 파일폴더 "cd C:\Users.." ->npde main.js
// node.js 설치해야댐.
//20191118 
