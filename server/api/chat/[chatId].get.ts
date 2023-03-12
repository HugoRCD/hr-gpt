import { getChat } from "~/server/app/chatService";

export default eventHandler(async (event) => {
  const chatId = parseInt(event.context.params.chatId);
  return await getChat(chatId);
});