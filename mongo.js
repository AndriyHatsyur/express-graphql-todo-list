import { MongoClient } from "mongodb";
import * as R from "ramda";
import * as F from "fluture";

import config from "./config";

const { DB_NAME, MONGO_URL } = config;

const mongoConnect = R.compose(
  F.cache,
  R.map((connection) => connection.db(DB_NAME)),
  F.encaseP((mongoUrl) => MongoClient.connect(mongoUrl))
);

const mongoConnectF = mongoConnect(MONGO_URL);

export const createCollectionF = (collectionName) =>
  R.compose(
    F.cache,
    R.map((mongoDatabase) => mongoDatabase.collection(collectionName))
  )(mongoConnectF);

export const cursorToArray = R.invoker(0, "toArray");

export const createQueryF = R.curry(
  (collection, methodName, filter, options = {}, afterMethod = R.identity) =>
    R.compose(
      R.map(afterMethod),
      R.map(R.invoker(2, methodName)(filter)(options))
    )(collection)
);

export const getCreatedDocF = (collection) =>
  R.compose(
    R.chain(
      R.compose(
        createQueryF(collection, "findOne"),
        R.applySpec({
          _id: R.prop("insertedId"),
        })
      )
    ),
    F.encaseP(R.identity)
  );

export const isDocumentDeleteF = R.compose(
  R.map(R.propEq("deletedCount", 1)),
  F.encaseP(R.identity)
);

export const getUpdatedDocF = R.compose(
  R.map(R.prop("value")),
  F.encaseP(R.identity)
);
