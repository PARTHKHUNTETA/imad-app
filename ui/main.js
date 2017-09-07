
var submit= document.getElementById('submit_btn');
submit.onclick=function()
{

     var request= new XMLHttpRequest();
  
  //capture the response and store it in a variable
  request.onreadystatechange=function()
  {
      if (request.readystate==XMLHttpRequest.DONE)
        {        if(request.status === 200)
                    { 
                  
                                 alert('logged in successfully');
                    }
                else if(request.status === 403)
                    {
                                 alert('username/passsword is incorrect');
                    }
                else if(request.status === 500)
                    {
                                alert('something went wrong on the server');
                    }
       }
    };
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST', 'http://parthkhunteta96.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username : username, password : password}));
};