const express          = require('./index.js').express,
      app              = require('./index.js').app,
      engines          = require('./index.js').engines,
      request          = require('./index.js').request,
      cookieParser     = require('cookie-parser'),
      cookieSession    = require('cookie-session'),
      passport         = require('passport'),
      wrap             = require('co-express'),
      FacebookStrategy = require('passport-facebook').Strategy,
      product          = require('./database/controller/Product.js'),
      User             = require('./database/controller/User.js'),
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
    callbackURL: '/auth/facebook/callback'
    }, 
    function(accessToken, refreshToken, profile, done) {
        var user =  profile;
        User.insert(profile.id, profile.displayName);
        return done(null, user);
  }));

app.get('/auth/facebook', 
    passport.authenticate('facebook', { 
      authType: 'rerequest', 
      scope: ['user_status', 'user_checkins'] 
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '../',
    failureFlash: true
}));

app.get('/auth/logout', function(req, res) {
    console.log(req);
    if(req.user) {
      // nullify session.
      req.session = null;
    }
    res.redirect('../../');
});


// front page.
app.get('/', product.getUserProduct, function (req, res) {
    var onlive_channel = require('./index.js').channels;
    var products = res.products;
    var name = 'Guest', id = -1;

    if(req.user) {
      id = req.user._json.id; 
      name = req.user._json.name;
    }

    console.log(products);


    res.render(templates_route + 'index.html',  
      { 'accountname'    : name,
        'uid'            : id, 
        'productlist'    : JSON.stringify(products), 
        'onlive_channel' : JSON.stringify(onlive_channel)
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

app.get('/addproduct',function (req,res) {
    // body...
    var name = 'Guest', id = -1;

    if(req.user) {
      id = req.user._json.id; 
      name = req.user._json.name;
    }
    res.render(templates_route + 'addproduct.html', {'accountname':name,'uid': id});
});


// product api.
app.post('/insertproduct', product.insert);
app.get('/productlist', product.productlist);
app.get('/userproduct', product.getUserProduct, function (req, res) {
    const products = res.products;
    if(products) {
        res.json(products);
    } else {
        res.sendStatus(400);
    }
});
