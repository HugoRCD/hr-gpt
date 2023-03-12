type Sender = 'user' | 'assistant' | 'system';

export type Message = {
  id?: number;
  role: Sender;
  content: string;
  chatId?: number;
  createdAt?: Date;
}

export type Chat = {
  id: number;
  name: string;
  messages: Message[];
}