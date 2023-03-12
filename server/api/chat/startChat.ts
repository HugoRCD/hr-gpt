import { startChat } from "~/server/app/chatService";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  return await startChat(body.userId, body.name);
});