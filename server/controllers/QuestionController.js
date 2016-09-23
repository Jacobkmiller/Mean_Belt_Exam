var mongoose = require('mongoose');

var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {

  postQuestion: function(req,res){
    if (req.body.content.length <10){
      res.status(400).send("Question Must Be longer than 10 characters");
      return;
    }
    var question = new Question(req.body)
    question.save(function(err){
      if (err){
        res.status(500).send("Question did not save");
      }
      else{
        res.status(200).send('Question Saved!');
      }
    })
	},

  getQuestions: function(req, res) {
    Question.find({}, function(err, questions) {
      if(err){
        res.status(500).send("Error finding questions" + err);
      }
      else{
        res.json(questions)
      }
    })
  },
  getQuestion: function(req, res) {
    Question.findOne({_id:req.params.id}).populate({path: 'answers', populate: {path:'user', model:'User'}})
    .exec(function(err, populatedq){
          console.log(populatedq);
          res.json(populatedq)
      }
    )},

}
