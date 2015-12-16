var check_url = "http://tvsalestream.herokuapp.com/checklogin/";
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '938533709533376',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

    function checkLoginState() {
      console.log("qq");
      FB.api('/me/',function(response){
		  console.log(response);
      $.ajax({
        type: 'post',
        url: check_url,
        data: {user:response.name, uid: response.id},
        success: function(response){
          console.log(response);
          window.location.href = "../";
        },
        done: function (response) {
          console.log(response);    
        }
        });
      });



  }

