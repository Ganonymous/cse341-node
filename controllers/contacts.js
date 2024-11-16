const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongoDb.getDatabase().db('Project1').collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const idString = String(req.params.id);
  const contactId = new ObjectId(idString);
  const result = await mongoDb
    .getDatabase()
    .db('Project1')
    .collection('contacts')
    .find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

module.exports = {
  getAll,
  getSingle
};
