import { H3Event } from "h3";
import { Configuration, OpenAIApi } from "openai";
import { createMessage, getChat } from "~/server/app/chatService";
import { Message } from "~~/types/Chat";

const openAiKey = useRuntimeConfig().private.openAIKey;

const configuration = new Configuration({
  apiKey: openAiKey,
});

/* Base Prompt
I want you to act as a document that I am having a conversation with. Your name is "AI Assistant". You will provide me with answers from the given text.
If the answer is not included in the text, say exactly "Hmm, I am not sure." and stop after that. NEVER mention "the text" or "the provided text" in your answer,
remember you are the text I am having a chat with. Never break character.
*/

function sanitizeMessageForOpenAI(messages: Message[]) {
  return messages.map((message) => {
    return {
      content: message.content,
      role: message.role,
    };
  });
}

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { chat, message } = body;
  if (message !== "") await createMessage(chat.id, message, "user");
  const openAiApi = new OpenAIApi(configuration);
  const response = await openAiApi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: sanitizeMessageForOpenAI(chat.messages),
    temperature: 0.9,
    stream: false,
    stop: ["user", "assistant"],
  });
  const ia_response = response.data.choices[0].message;
  if (ia_response) {
    await createMessage(chat.id, ia_response.content, "assistant");
  }
  const updatedChat = await getChat(chat.id);
  return {
    statusCode: 200,
    chat: updatedChat,
  }
});