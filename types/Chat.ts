type Sender = 'user' | 'ia';

export type Chat = {
  sender: Sender;
  message: string;
}