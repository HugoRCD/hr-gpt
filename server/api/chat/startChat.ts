import { startChat } from "~/server/app/chatService";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, name, pre_prompt, first_message } = body;
  return await startChat(userId, name, pre_prompt, first_message);
});