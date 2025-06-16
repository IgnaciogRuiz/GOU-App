import { gqlRequest } from '../client';

const query = `
    query {
    me {
        chats {
        id
            other_user {
                profile_photo
                firstname
                lastname
            }
            last_message {
                message
                status
                created_at
            }
        }
    }
    }
`;


export const getChats = async (token: string) => {
  return gqlRequest(query, {}, token);
};