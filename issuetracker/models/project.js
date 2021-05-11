const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_on: { type: String },
  updated_on: { type: String },
  created_by: { type: String, required: true },
  assigned_to: { type: String, default: "" },
  open: { type: Boolean, default: true },
  status_text: { type: String, default: "" }
});

const projectSchema = new Schema({
  name: String,
  issues: [issueSchema]
});


exports.Issue = mongoose.model('Issue', issueSchema);
exports.Project = mongoose.model('Project', projectSchema);
