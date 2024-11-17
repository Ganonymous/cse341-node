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

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongoDb
    .getDatabase()
    .db('Project1')
    .collection('contacts')
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred during contact creation.');
  }
};

const updateContact = async (req, res) => {
  const idString = String(req.params.id);
  const contactId = new ObjectId(idString);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongoDb
    .getDatabase()
    .db('Project1')
    .collection('contacts')
    .replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the contact');
  }
};

const deleteContact = async (req, res) => {
  const idString = String(req.params.id);
  const contactId = new ObjectId(idString);
  const response = await mongoDb
    .getDatabase()
    .db('Project1')
    .collection('contacts')
    .deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred during contact deletion');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
