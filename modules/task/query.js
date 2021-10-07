import { ObjectId } from "mongodb";
import * as R from "ramda";
import * as F from "fluture";

import { createQueryF, cursorToArray } from "../../mongo";
import { TasksCollection } from "./collection";

const getAllTasksF = (filter = {}) =>
  createQueryF(TasksCollection, "find", filter, {}, cursorToArray);

const getTaskByIdF = (_, { id }) =>
  createQueryF(TasksCollection, "findOne", { _id: ObjectId(id) });

export default {
  Query: {
    tasks: R.compose(F.promise, getAllTasksF),
    task: R.compose(F.promise, getTaskByIdF),
  },
};
