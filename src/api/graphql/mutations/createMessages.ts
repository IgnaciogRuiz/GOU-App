import { gqlRequest } from '../client';

const mutation = `
  mutation CreateMessage($chat: ID!, $sender: ID!, $message: String!, $status: MessageStatus!) {
  createMessage(chat_id: $chat, sender_id: $sender, message: $message, status: $status) {
    id
    message
    status
    created_at
    sender {
      id
      firstname
      lastname
      profile_photo
    }
    chat {
      id
    }
  }
}
`;

export const createMessage = async (
  chatId: string,
  senderId: string,
  message: string,
  token: string
) => {
  const variables = {
    chat: chatId,
    sender: senderId,
    message,
    status: 'SENT', // debe coincidir con el enum MessageStatus!
  };

  const data = await gqlRequest(mutation, variables, token);
  return data?.createMessage;
};
