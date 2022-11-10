import * as df from "durable-functions";

const orchestrator = df.orchestrator(function* (context) {
  const outputs = [];
  try {
    outputs.push(yield context.df.callActivity("Hello", "Tokyo"));
    outputs.push(yield context.df.callActivity("Hello", "Seattle"));
    outputs.push(yield context.df.callActivity("Hello", "London"));
  } catch (error) {
    context.log(error);
    throw error;
  }
  return outputs;
});

export default orchestrator;
