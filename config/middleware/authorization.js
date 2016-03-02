exports.requiresLogin = function (req, res, next) {
    if(req.isAuthenticated()) { 
        return next();
    } else if(req.method == 'GET') {
        req.session.returnTo = req.originalUrl;
    }
    res.redirect('/login');
}