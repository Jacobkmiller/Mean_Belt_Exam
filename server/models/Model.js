var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  birthday: Date,
  created_at: Date

});
mongoose.model('User', UserSchema);

var QuestionSchema = new mongoose.Schema({
  content: String,
  description: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  answercount: {type: Number, default: 0}
})
mongoose.model('Question', QuestionSchema);

var AnswerSchema = new mongoose.Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  description: String,
  like: {type:Number, default: 0}
})
mongoose.model('Answer', AnswerSchema)
