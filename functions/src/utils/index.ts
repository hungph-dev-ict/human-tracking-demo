import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressJwt from "express-jwt";
import * as cors from "cors";

import { API_VERSION, API_SECRET } from "../config";

export const app = express();
app.use(cors());

// Lazy loaded module
// let iconv, parse, stringify, through2, Busboy, path;

export function createBaseExpressApp(
  apiPath,
  controller,
  runtimeOpts = {}
) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Routers
  app.use(`/${API_VERSION}/${apiPath}`, controller);

  // Catch 404 errors
  app.use(function(req, res, next) {
    const err: any = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // Catch 500 errors
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      error: err.message
    });
  });

  return functions.runWith(runtimeOpts).https.onRequest(app);
}

export function makeError(message, code?, data?) {
  const error: any = new Error(message);
  error.code = code;
  error.data = data;
  return error;
}
