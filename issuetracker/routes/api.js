'use strict';

const Project = require('../models/project').Project;
const Issue = require('../models/project').Issue;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res) {
      let aggregated = await Project.aggregate([
        { $match : { name: req.params.project } },
        { $unwind: "$issues" },
        req.query._id != undefined
          ? { $match: { "issues._id": ObjectId(req.query._id) } }
          : { $match: {} },
        req.query.issue_title != undefined
          ? { $match: { "issues.issue_title": req.query.issue_title } }
          : { $match: {} },
        req.query.issue_text != undefined
          ? { $match: { "issues.issue_text": req.query.issue_text } }
          : { $match: {} },
        req.query.created_on != undefined
          ? { $match: { "issues.created_on": req.query.created_on } }
          : { $match: {} },
        req.query.updated_on != undefined
          ? { $match: { "issues.updated_on": req.query.updated_on } }
          : { $match: {} },
        req.query.created_by != undefined
          ? { $match: { "issues.created_by": req.query.created_by } }
          : { $match: {} },
        req.query.assigned_to != undefined
          ? { $match: { "issues.assigned_to": req.query.assigned_to } }
          : { $match: {} },
        req.query.open != undefined
          ? { $match: { "issues.open": req.query.open } }
          : { $match: {} },
        req.query.status_text != undefined
          ? { $match: { "issues.status_text": req.query.status_text } }
          : { $match: {} }
      ]);
      res.json(aggregated.map(x => x.issues));
    })
    
    .post(async function (req, res) {
      let newIssue = new Issue({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        open: true,
        status_text: req.body.status_text
      });

      let project;
      project = await Project.findOne({ name: req.params.project });
      if (!project) {
        project = new Project({ name: req.params.project });
      }

      project.issues.push(newIssue);

      try {
        await project.save();
      } catch (error) {
        res.json({ error: 'required field(s) missing' }); 
        return;
      }

      res.json(newIssue);
    })
    
    .put(async function (req, res) {
      if (!req.body._id) {
        res.json({ error: 'missing _id' });
        return;
      }
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        open,
        status_text,
        _id
      } = req.body;
      if (
        !issue_title &&
        !issue_text &&
        !created_by &&
        !assigned_to &&
        !open &&
        !status_text
      ) {
        res.json({ error: 'no update field(s) sent', '_id': _id });
        return;
      }

      try {
        let project = await Project.findOne({ name: req.params.project });
        let issue = project.issues.id(_id);
        for (let item in req.body) {
          if (req.body[item]) {
            issue[item] = req.body[item];
          }
        }
        issue['updated_on'] = new Date().toISOString();
        await project.save();
        res.json({ result: 'successfully updated', '_id': _id });
      } catch (error) {
        res.json({ error: 'could not update', '_id': _id }); 
        return;
      }
    })
    
    .delete(async function (req, res) {
      if (!req.body._id) {
        res.json({ error: 'missing _id' });
        return;
      }
      try {
        let project = await Project.findOne({ name: req.params.project });
        if (!project.issues.id(req.body._id)) {
          throw 'the specified id is not in the database';
        }
        await Project.findOneAndUpdate({
          name: req.params.project
        }, {
          '$pull': {
            'issues': {
              '_id': ObjectId(req.body._id)
            }
          }
        }, { useFindAndModify: false }
        );
        res.json({ result: 'successfully deleted', '_id': req.body._id });
      } catch (error) {
        res.json({ error: 'could not delete', '_id': req.body._id });
      }
    });

};
