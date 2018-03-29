const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate'); // TODO:

const sex = ['M', 'F'];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  // name: { first: String, last: { type: String, trim: true } },
  // email: { type: String, required: 'Email is required' },
  password: {
    type: String,
    minlength: [3, 'Password is too short'],
    maxlength: 100,
    required: [true, 'Password is required'],
  },
  // age: { type: Number, min: [0, 'Min allowed is 0'] },
  sex: {
    type: String,
    enum: {
      values: sex,
      message: 'Invalid value for sex',
    },
  },
  // lastLogin: { type: Date, default: Date.now },
  // file: { match: '*.pdf' },
  // superUser: Boolean,
  // status
});

// userSchema.virtual('fullName').get(() => `${this.name.first} ${this.name.last}`);


module.exports.User = mongoose.model('Users', userSchema);
