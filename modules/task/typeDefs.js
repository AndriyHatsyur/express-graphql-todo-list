import { gql } from "apollo-server-express";

export const taskTypeDefs = gql`
  type Task {
    _id: ID
    title: String
    isCompleted: Boolean
    author: String
  }

  type Query {
    tasks: [Task]
  }

  type Query {
    task(id: ID): Task
  }

  input TaskInput {
    title: String
    author: String
    isCompleted: Boolean
  }

  type Mutation {
    createTask(taskInput: TaskInput): Task
    deleteTask(id: ID): Boolean
    updateTask(id: ID, input: TaskInput): Task
  }
`;
