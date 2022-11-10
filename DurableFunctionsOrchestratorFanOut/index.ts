import * as df from "durable-functions";

const orchestrator = df.orchestrator(function* (context) {
  const parallelTasks = [];
  const workBatch = ["Tokyo", "Seattle", "London"];

  for (const workItem of workBatch) {
    parallelTasks.push(context.df.callActivity("Hello", workItem));
  }

  try {
    yield context.df.Task.all(parallelTasks);
  } catch (error) {
    context.log(error);
    throw error;
  }

  return parallelTasks.map((task) => task.result);
});

export default orchestrator;
