import { updateChatName } from "~/server/app/chatService";

export default eventHandler(async (event) => {
  const chatId = parseInt(event.context.params.chatId);
  const body = await readBody(event);
  const { name } = body;
  return await updateChatName(chatId, name);
});