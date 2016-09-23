var mongoose = require('mongoose');

var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {

  postAnswer: function(req,res){
    if (req.body.content.length <5){
      res.status(400).send("Answer Must Be longer than 5 characters");
      return;
    }
    var answer = new Answer(req.body)
    answer.user = req.session.user._id;
    answer.save(function(err){
      if (err){
        res.status(500).send("Answer did not save");
      }
      else{
        console.log("answer "+answer);
        console.log(req.params.id);
        Question.update({_id: req.params.id}, {$push: {answers: answer._id} }).exec(function(err, question){
          console.log("made it to line 18");
          if(err){
            console.log("trouble adding answer to question" + err);
          }
          else{
            console.log("added answer to question");
            Question.update({_id:req.params.id}, {$inc: {answercount: 1} }).exec(function(err, question){
              if(err){
                console.log("trouble incrementing answers on question" + err);
              }
              else{
                console.log("incremented answers on question");
                res.status(200).send('Answer Saved!');
              }
            })
          }
        });
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
    Question.findOne({_id:req.params.id}, function(err, question) {
      if(err){
        res.status(500).send("Error finding question" + err);
      }
      else{
        res.json(question)
      }
    })
  },

  likeAnswer: function(req, res) {
    console.log("made it to answer controller");
    Answer.update({_id:req.params.id}, {$inc: {like: 1} }).exec(function(err, answer){
      if(err){
        console.log(err);
      }
      else {
        console.log("answer liked");
        res.json(answer);
      }
    })
  },


}
