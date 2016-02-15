var check_url = "http://tvsalestream.herokuapp.com/checklogin/";

function loginFacebook() {
  $.get('../auth/islogin', function(response) {
    if(!response) {
      // goto login page.
      console.log('try to login');
      window.location = "../auth/facebook";
    } else {
      // already logged.
      console.log(response);
    }
  });
}

function checkLogin() {
  $.get('../auth/islogin', function(response) {
    if(response) {
      // do some change.
    }
  });

}
