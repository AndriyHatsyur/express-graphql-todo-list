import taskQuery from "./query";
import taskMutation from "./mutation";

export default {
  ...taskQuery,
  ...taskMutation,
};
