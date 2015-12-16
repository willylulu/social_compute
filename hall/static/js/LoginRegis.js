$('#showLogin').mouseover(function(){
    $('#showLogin').css("border","0.2em solid white");
    $('#showLogin').css("font-size","2vw");
    $('#showLogin').css("height","11vw");
    $('#showLogin').css("width","11vw");
    
    $('#showRegister').css("border-color","gray");
    $('#showRegister').css("color","gray");
    $('#showRegister').css("height","9vw");
    $('#showRegister').css("width","9vw");
});

$('#showLogin').mouseout(function(){
    $('#showLogin').css("border","0.1em solid white");
    $('#showLogin').css("font-size","1.5vw");
    $('#showLogin').css("height","10vw");
    $('#showLogin').css("width","10vw");
    
    
    $('#showRegister').css("border-color","white");
    $('#showRegister').css("color","white");
    $('#showRegister').css("height","10vw");
    $('#showRegister').css("width","10vw");
    
});


$('#showRegister').mouseover(function(){
    $('#showRegister').css("border","0.2em solid white");
    $('#showRegister').css("font-size","2vw");
    $('#showRegister').css("height","11vw");
    $('#showRegister').css("width","11vw");
    
    $('#showLogin').css("border-color","gray");
    $('#showLogin').css("color","gray");
    $('#showLogin').css("height","9vw");
    $('#showLogin').css("width","9vw");
});

$('#showRegister').mouseout(function(){
    $('#showRegister').css("border","0.1em solid white");
    $('#showRegister').css("font-size","1.5vw");
    $('#showRegister').css("height","10vw");
    $('#showRegister').css("width","10vw");
    
    
    $('#showLogin').css("border-color","white");
    $('#showLogin').css("color","white");
    $('#showLogin').css("height","10vw");
    $('#showLogin').css("width","10vw");
    
});

var flag = 0;


var acc_html = "<div><input type='text' name='lbsv' id='acc_in' class='input-open' placeholder='    Account Here'></div>";
var pwd_html = "<div><input type='password' name='jpu' id='pwd_in' class='input-open' placeholder='    Password Here'></div>";
var fb_login = '<div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="false" onlogin="checkLoginState()"></div>';

var csrf = "<input type='hidden' name='csrfmiddlewaretoken' value='"+$('#csrf').val() + "'>";

$('.showBtn').click(function(){
    
     $(this).animate({
       borderRadius:0,
       width :"30vw",
       height:"30vw",
       marginTop:"-=10vw",
        marginLeft:"-=2vw",
       
   }, 500, function(){
       
       
   });
    
    $('.showBtn').hide();
    $('#fbloginbtn').hide();
    $('#or').hide();
    $(this).attr("id","show_open");
      if($(this).text() == "Login"){
        flag = 1;
    }
    else if($(this).text()=="Register"){
        flag = 2;
    }    
    $(this).show();    
    $(this).text("");
    if(flag == 1){
    $('#show_open').append('<form action="" method="post">'+csrf+acc_html+pwd_html+'<button type="submit" class="submit-btn">登入</button>');
   }
    else if (flag == 2 ){ 
    $('#show_open').append('<form action="../regis/" method="post">'+csrf+acc_html+pwd_html+'<button type="submit" class="submit-btn">註冊</button>');
	}
    return false;
});

$('#page-top').click(function(){
    
    $("#show_open").animate({
          width:"10vw",
           height:"10vw",
           borderRadius:"100%",
           borderWidth:"0.1em",
            fontSize:"1.5vw",
           marginTop:"+=10vw",
           marginLeft:"+=2vw",
    });

    if(flag == 1 ){
        $("#show_open").text("Login");
        $("#show_open").attr("id","showLogin");
    }
    else if(flag == 2){
        $("#show_open").text("Register");
        $("#show_open").attr("id","showRegister");
    }
    else{

    }
      $('#fbloginbtn').show();
      $('#or').show(); 
      $('.showBtn').show();
        flag = 0;      
});


$('.showBtn').on('click','.input-open',function(event){

    return false;
    
});


$('.showBtn').on('click','.submit-btn',function(){
       $(html).click(function(){            
                     return true;
                     });
        return true;
});


$(document).ready(function(){
    function loop(){
     $("#back").animate({
         fontSize : '+=8',
         
     }, 800, 'linear',function loop_r(){
         $("#back").animate({
             fontSize : '-=8',
        
         },800,'linear');
         
        loop();
     });
        
    }
    loop();
    
});

$("#back").click(function(){ 
    window.location.href = "../";
})











