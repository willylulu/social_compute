const express          = require('./index.js').express,
      app              = require('./index.js').app,
      engines          = require('./index.js').engines,
      request          = require('./index.js').request,
      cookieParser     = require('cookie-parser'),
      cookieSession    = require('cookie-session'),
      passport         = require('passport'),
      FacebookStrategy = require('passport-facebook').Strategy,
      templates_route  = __dirname + '/hall/templates/';


////////////////////////////////////////////////
//              FACEBOOK SECTION              //
////////////////////////////////////////////////

// use cookie mechanism to maintain user login status.
// we have to init cookie parser/session first, and initilize
// passport after it.
app.use(cookieParser());
app.use(cookieSession({
  secret: 'Youknowthissecretsoyouareapsycho',
  cookie: {
    maxAge: 60*1000*500
  }
}))

app.use(passport.initialize());
app.use(passport.session());

// serialize data to put in session
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// The function will put user object into session.
// We can check the session by access req.user.
passport.use('facebook', new FacebookStrategy({
  clientID: '938533709533376',
  clientSecret: 'fe74d87e74a2d2e145974556ed7e7c0a',
  callbackURL: '../auth/response'
  },
  function(accessToken, refreshToken, profile, done) {
    var user = profile;
    return done(null, user);
  }
));

// check if user has login or not and redirect.
// currently useless.
app.get('/auth', function(req, res) {
    console.log(req);
    if(req.isAuthenticated()) {
        console.log('logged in');
    } else {
        console.log('nope');
    }
    res.redirect('../');
});

app.get('/auth/facebook', 
    passport.authenticate('facebook', 
        { authType: 'rerequest', scope: ['user_status', 'user_checkins'] }));

app.get('/auth/response', passport.authenticate('facebook', {
    successRedirect: '/auth',
    failureRedirect: '../',
    failureFlash: true
}));

app.get('/auth/islogin', function(req, res) {
    // return user data or null.
    if(req.user)
      res.send(req.user._json);
    else
      res.send(null);
});

app.get('/auth/logout', function(req, res) {
    console.log(req);
    if(req.user) {
      // nullify session.
      req.session = null;
    }
    res.redirect('../../');
});




// front page.
app.get('/', function(req, res) {
    var onlive_channel = require('./index.js').channels;
    var name = 'Guest', id = -1;

    if(req.user) {
      id = req.user._json.id; 
      name = req.user._json.name;
    }

    request({
        url: 'http://tvsalestream.herokuapp.com/getuserproduct/',
         //URL to hit
        method: 'GET',
        json:true
    }, function(error, response, json){
        if(error) {
            console.log(error);
        } else {
            var str_json = JSON.stringify(json);
            var str_channel = JSON.stringify(onlive_channel);


            res.render(templates_route + 'index.html',{'accountname':name,'uid': id,'productlist':str_json,'onlive_channel':str_channel});
        }
    });
});


// register page.
app.get('/account', function(req, res) {
    res.sendFile(templates_route + 'LoginRegis.html');

});

app.get('/logout', function(req, res) {
    //res.sendFile(templates_route + 'LoginRegis.html');

});


app.get('/orderlist', function(req, res) {

  if(!req.user) {
    res.sendStatus(404);
    return;
  }

  var uid = req.user._json.id;
  var url = 'http://tvsalestream.herokuapp.com/orderlist/';
  var data = {uid : uid.toString()};
  console.log(uid);
  request({
    url: url,
    method: 'POST',
    form : data
  },function(error, response, body){
    if(error) {
      console.log(error);
    } else {
      console.log(uid); 
      console.log(body);
      res.render(templates_route + 'orderlist.html', {'orderlist' : JSON.parse(body)});
      return;
    }
    res.sendStatus(404);
  });
});

app.get('/productlist', function(req, res) {
  var onlive_channel = require('./index.js').channels;
  console.log(onlive_channel);
  request({
        url: 'http://tvsalestream.herokuapp.com/allproduct/',
         //URL to hit
        method: 'GET',
        json:true
    }, function(error, response, json){
        if(error) {
            console.log(error);
        } else {
            // handle for demo SCAD, object to dictionary
            for(var k in json){
              //console.log(json[k].fields.description);
              json[k].fields.description = json[k].fields.description.replace(/\n/g,"<br>");
            }
            var str_json = JSON.stringify(json);
            var str_channel = JSON.stringify(onlive_channel);
            res.render(templates_route + 'productlist.html',{'productlist':json,'onlive_channel':str_channel,'productlist_dict':str_json,});
        }
    });
});
app.post('/checklogin', function(req, response) {
    var body = '';
    var str_json;
    req.on('data', function(data) {
        body += data; 
    });
    req.on('end',function() {
        var temp = body.split("=");
        var temp = temp[1];
        var uurl = 'http://tvsalestream.herokuapp.com/getuserproduct/?uid='+temp;
        request({
            url: uurl,
             method: 'GET',
             json:true
        },function(error,res,userproduct){
             if(error) {
                console.log(error);
            } else {
                response.json(userproduct);
            }
        });
    });
});
app.get('/addproduct',function (req,res) {
    // body...
    var name = 'Guest', id = -1;

    if(req.user) {
      id = req.user._json.id; 
      name = req.user._json.name;
    }
    res.render(templates_route + 'addproduct.html', {'accountname':name,'uid': id});
});

