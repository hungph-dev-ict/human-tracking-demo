import * as firebaseHelper from "firebase-functions-helper";

import dbFirestore from "../config/firestore";

const usersCollection = "users";

/**
 * Add an user document to collection.
 *
 * @param {*} reqBody
 * @param {*} res
 * @returns
 */
async function addUser(reqBody, res) {
  try {
    firebaseHelper.firestore.createNewDocument(
      dbFirestore,
      usersCollection,
      reqBody
    );
    return res.sendStatus(201);
  } catch (e) {
    return res.sendStatus(404);
  }
}

/**
 * Get all users document.
 *
 * @param {*} res
 * @returns
 */
async function getAllUsers(res) {
  try {
    firebaseHelper.firestore
      .backup(dbFirestore, usersCollection)
      .then(data => res.status(200).send(data));
  } catch (e) {
    return res.sendStatus(404);
  }
}

/**
 * Get the user document.
 *
 * @param {*} reqId
 * @param {*} res
 * @returns
 */
async function getUser(reqId, res) {
  try {
    await firebaseHelper.firestore
      .getDocument(dbFirestore, usersCollection, reqId)
      .then(doc => res.status(200).send(doc));
  } catch (e) {
    return res.sendStatus(404);
  }
}

/**
 * Update the user document.
 *
 * @param {*} reqId
 * @param {*} reqBody
 * @param {*} res
 * @returns
 */
async function updateUser(reqId, reqBody, res) {
  try {
    firebaseHelper.firestore.updateDocument(
      dbFirestore,
      usersCollection,
      reqId,
      reqBody
    );
    res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(404);
  }
}

/**
 * Delete the user document.
 *
 * @param {*} reqId
 * @param {*} res
 * @returns
 */
async function deleteUser(reqId, res) {
  try {
    firebaseHelper.firestore.deleteDocument(
      dbFirestore,
      usersCollection,
      reqId
    );
    res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(404);
  }
}

export default {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
};
