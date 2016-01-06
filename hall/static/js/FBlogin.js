var check_url = "http://tvsalestream.herokuapp.com/checklogin/";
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '938533709533376',
      xfbml      : true,
      version    : 'v2.5'
    });
    checkLoginState(function () {
      FBinitCallback();
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

function checkLoginState(callback) {
      FB.getLoginStatus(function(response) {
        console.log(response);

        if(response && response.status === 'connected') {
            me=response;
        }
        if(callback && response) {
          callback(response.status);
        }
      });
    }

    function loginFacebook() {
      checkLoginState(function(resp){
          if(resp != 'connected') {
            console.log('not login.');
            FB.login(function (response) {
              if(response.authResponse) {
                location.reload();
              }
            });
          }
      });
    }
