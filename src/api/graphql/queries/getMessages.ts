import { gqlRequest } from '../client';

const query = `
  query GetMessages($chatId: ID!) {
    getMessages(chat_id: $chatId) {
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
    }
  }
`;

// recibe chatId y token, retorna los mensajes
export const getMessages = async (chatId: string, token: string) => {
  const data = await gqlRequest(query, { chatId }, token);
  return data?.getMessages || [];
};
