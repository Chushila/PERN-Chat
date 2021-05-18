var express = require('express');
var router = express.Router();
const {addContact, contactPage} = require('../controllers/contacts')
const {createConversation} = require ('../controllers/conversations')
const passport = require('passport')
const {insertMessage} = require ('../controllers/messages.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/contacts', addContact);
router.post('/messages', insertMessage)
router.post('/conversations', createConversation);



router.get('/google',
  passport.authenticate('google', { scope: ['email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;
