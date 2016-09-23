var userRoutes = require('../controllers/UserController.js');
var questionRoutes = require('../controllers/QuestionController.js');
var answerRoutes = require('../controllers/AnswerController.js');

module.exports = function(app){
  app.post('/register', userRoutes.register);
  app.post('/login', userRoutes.login);
  app.use(userAuth);
  // app.get('/customers', userRoutes.getCustomers);

  // app.delete('/product/:id', userRoutes.deleteProduct);
  app.get('/user', userRoutes.getUser);
  app.get('/logout', userRoutes.logout);
  app.post('/question', questionRoutes.postQuestion);
  app.get('/questions', questionRoutes.getQuestions);
  app.get('/question/:id', questionRoutes.getQuestion);
  app.post('/answer/:id', answerRoutes.postAnswer);
  app.get('/answerlike/:id', answerRoutes.likeAnswer);
}
function userAuth(req,res,next){
  if (req.session.user){
    next();
  }else{
    res.sendStatus(401);
  }
}
