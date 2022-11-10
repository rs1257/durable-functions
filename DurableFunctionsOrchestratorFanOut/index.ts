import * as df from "durable-functions";

const orchestrator = df.orchestrator(function* (context) {
  const parallelTasks = [];
  const workBatch = ["Tokyo", "Seattle", "London"];

  for (const workItem of workBatch) {
    parallelTasks.push(context.df.callActivity("Hello", workItem));
  }

  yield context.df.Task.all(parallelTasks);

  return parallelTasks.map((task) => task.result);
});

export default orchestrator;
