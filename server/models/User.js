const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('useCreateIndex', true);
const UserSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  authId: { type: String, unique: true },
  role: { type: String, default: 'regular' },
  avatar: { type: String, default: '' },
  firstName: { type: String, default: '', min: 1, max: 100 },
  lastName: { type: String, default: '', min: 1, max: 100 },
  teams: [{ type: String }]
});

module.exports = mongoose.model(' User', UserSchema);
