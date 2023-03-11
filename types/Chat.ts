type Sender = 'user' | 'assistant' | 'system';

export type Chat = {
  role: Sender;
  content: string;
}