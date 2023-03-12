import { getChats } from "~/server/app/chatService";

export default eventHandler(async () => {
  return await getChats();
});