import * as R from "ramda";
import * as F from "fluture";
import { ObjectId } from "mongodb";

import {
  createQueryF,
  getCreatedDocF,
  isDocumentDeleteF,
  getUpdatedDocF,
} from "../../mongo";
import { TasksCollection } from "./collection";

const createTasksF = (_, { taskInput }) =>
  createQueryF(TasksCollection, "insertOne", taskInput);

const createTasksP = R.compose(
  F.promise,
  R.chain(getCreatedDocF(TasksCollection)),
  createTasksF
);

const deletaTaskF = (_, { id }) =>
  createQueryF(TasksCollection, "deleteOne", { _id: ObjectId(id) });

const deleteTaskP = R.compose(
  F.promise,
  R.chain(isDocumentDeleteF),
  deletaTaskF
);

const updateTasksF = (_, { id, input }) =>
  createQueryF(
    TasksCollection,
    "findOneAndUpdate",
    { _id: ObjectId(id) },
    { $set: { ...input } }
  );

const updateTasksP = R.compose(
  F.promise,
  R.chain(getUpdatedDocF),
  updateTasksF
);

export default {
  Mutation: {
    createTask: createTasksP,
    deleteTask: deleteTaskP,
    updateTask: updateTasksP,
  },
};
