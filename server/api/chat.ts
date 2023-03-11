import { H3Event } from "h3";
import { Configuration, OpenAIApi } from "openai";

const openAiKey = useRuntimeConfig().private.openAIKey;

const configuration = new Configuration({
  apiKey: openAiKey,
});

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { chat } = body;
  const openAiApi = new OpenAIApi(configuration);
  const response = await openAiApi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: chat,
    temperature: 0.9,
    stream: false,
    stop: ["user", "assistant"],
  });
  const ia_response = response.data.choices[0].message;
  return {
    statusCode: 200,
    chat: [...chat, ia_response],
  }
});