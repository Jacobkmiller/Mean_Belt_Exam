var mongoose = require('mongoose');

var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {

  register: function(req,res){
    if (req.body.email.length <3 || req.body.password <8){
      res.status(400).send("Some message");
      return;
    }
    User.findOne({email:req.body.email}, function(err,user){
        if (user){
          res.status(400).send("User exists");
        }else{
          var user = new User(req.body);
          user.save(function(err){
            if (err){
              res.status(500).send("Users did not save");
            }
            else{
              req.session.user = req.body;
              res.sendStatus(200);
            }
          });
        }
    })
	},

	login: function (req, res) {
    console.log(req.body);
		User.findOne({email: req.body.email}).exec(function (err, user) {
      if(user == null){
        res.status(400).send("Login Failed")
      }
			else if(req.body.password == user.password){
				req.session.user = user;
				res.sendStatus(200);
			}
		})
	},

  logout: function (req, res) {
    req.session.destroy();
    res.redirect('/');
  },

  getUser: function(req, res){
    res.json(req.session.user);
  },

  getUsers: function(req, res){
    User.find({}).exec(function(err, users){
      if(err){
        res.status(500).send('There was a problem retrieving all users')
      }
      else{
        res.json(users);
      }
    })
  },
}
