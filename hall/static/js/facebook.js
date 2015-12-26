/*存放FB使用者的資料*/
var me;

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  me = response;
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    /*連線後就會跳轉回index頁面*/
    if (window.location.pathname.split(/(\\|\/)/g).pop() == 'login') window.location.href = '/';
    /*再publish頁面如果有登入，我們會要求你解除發文的權限*/
    else if (window.location.pathname.split(/(\\|\/)/g).pop() == 'publish') {
      $.get('https://graph.facebook.com/'+response.authResponse.userID+'/permissions?access_token='+response.authResponse.accessToken,
        function (res) {
          var grante = 0;
          for (var i = 0; i < res.data.length; i++) {
            if(res.data[i].permission=='publish_actions'&&res.data[i].status=="granted"){
              grante = 1;
            }
          };
          if(grante!=1){
              FB.login(function(response) {
        // handle the response
                }, {
                  scope: 'publish_actions',
                  return_scopes: true
                });
            }
        });
    }
    /*如果沒有登入不論去哪都會跳轉回logi頁面*/
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    //if (window.location.pathname.split(/(\\|\/)/g).pop() != 'login') window.location.href = '/login';
    console.log("no Authorized!");
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    //if (window.location.pathname.split(/(\\|\/)/g).pop() != 'login') window.location.href = '/login';
    console.log("no login!");
  }
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '1703464653208469',
    cookie: true, // enable cookies to allow the server to access 
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
}
