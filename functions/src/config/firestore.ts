import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const adminApp = admin.initializeApp(functions.config().firebase);
admin.firestore(adminApp);

const settings = { timestampsInSnapshots: true };

const db = admin.firestore();
db.settings(settings);

export default db;
