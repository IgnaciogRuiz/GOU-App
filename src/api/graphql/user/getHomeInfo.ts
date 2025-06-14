import { gqlRequest } from '../client';

const query = `
    query {
    dashboardData {
        profile_photo
        reservations {
        id
        trip {
            origin
            destination
            date
            available_seats
            price
            vehicle {
            user {
                firstname
                lastname
            }
            }
        }
        }
        published_trips {
        id
        origin
        destination
        price
        available_seats
        date
        reservations {
            status
            user {
            id
            firstname
            }
        }
        }
        recent_activity {
        title
        description
        time
        icon
        iconColor
        }
    }
    }
`;


export const getHomeData = async (token: string) => {
  return gqlRequest(query, {}, token);
};