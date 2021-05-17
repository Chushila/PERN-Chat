var express = require('express');
const {selectContactByUser} = require('../controllers/contacts')
const {getConversationsForUser} = require('../controllers/conversations')
const {getMessages} = require ('../controllers/messages.js')
const {addUser} = require ('../controllers/users')
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  
  req.user ? res.send(req.user): res.json({messages:'no user'})
});

router.post('/',addUser)

router.post('/messages',getMessages)
router.post('/contacts', selectContactByUser);
router.post('/conversations', getConversationsForUser);

module.exports = router;
