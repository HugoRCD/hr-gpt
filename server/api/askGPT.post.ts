import { H3Event } from "h3";
import { Configuration, OpenAIApi } from "openai";

const openAiKey = useRuntimeConfig().private.openAIKey;

const configuration = new Configuration({
  apiKey: openAiKey,
});

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { question } = body;
  const openAiApi = new OpenAIApi(configuration);
  const response = await openAiApi.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    temperature: 0.9,
    max_tokens: 700,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  if (response.data.choices.length === 0) {
    return {
      statusCode: 200,
      body: "OK",
      response: "Sorry, I don't know the answer to that question.",
    };
  } else if (response.data.choices[0].text === "") {
    return {
      statusCode: 200,
      body: "OK",
      response: "Sorry, I don't know the answer to that question.",
    };
  } else {
    return {
      statusCode: 200,
      body: "OK",
      response: response.data.choices[0].text?.replace(/^\n{2}/, ""),
    };
  }
});
