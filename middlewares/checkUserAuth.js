module.exports = function checkUserAuth(req, res, next) {
    // If user is logged in => next() (Let him trough)
    if (req.user && req.user._id) next();
    else res.status(403).json({msg:"Unauthorized"})
}
