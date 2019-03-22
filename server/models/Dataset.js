const mongoose = require('mongoose');
const { Schema } = mongoose;

const DatasetSchema = new Schema({
  // so this will be the datasets id that we get
  // from duct
  datasetId: { type: String, required: true, unique: true },
  author: { type: 'ObjectId', ref: 'User' },
  name: { type: String, min: 1 },
  team: { type: String, default: 'none' },
  public: { type: Boolean, default: false }
});

module.exports = mongoose.model(' Dataset', DatasetSchema);
