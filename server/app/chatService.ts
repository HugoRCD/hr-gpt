import prisma from "~/server/database/client";
import { Chat, Message } from "@prisma/client";

export async function getChats() {
  return await prisma.chat.findMany();
}

export async function startChat(userId: number, name: string, prePrompt: string, first_message: string) {
  const firstMessage = {
    role: "assistant",
    content: first_message ?? "Hello, how can I help you?",
  }
  return await prisma.chat.create({
    data: {
      user: {
        connect: {
          id: userId,
        }
      },
      name,
      messages: {
        create: firstMessage,
      }
    },
  });
}

export async function deleteChat(id: number) {
  return await prisma.chat.delete({
    where: {
      id,
    },
  });
}

export async function deleteAllChats() {
  return await prisma.chat.deleteMany();
}

export async function getChat(id: number): Promise<Chat & { messages: Message[] }> {
  const chat = await prisma.chat.findUnique({
    where: {
      id,
    },
    include: {
      messages: true,
    }
  });
  if (!chat) {
    throw createError({ statusCode: 404, message: "Chat not found" });
  }
  return chat;
}

export async function updateChatName(id: number, name: string) {
  return await prisma.chat.update({
    where: {
      id,
    },
    data: {
      name,
    }
  });
}

export async function createMessage(chatId: number, message: string, role: "user" | "assistant") {
  return await prisma.message.create({
    data: {
      content: message,
      role,
      chat: {
        connect: {
          id: chatId,
        }
      }
    },
  });
}