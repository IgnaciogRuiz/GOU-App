//QUERIES & MUTACION

//HOME
export { getHomeData } from './queries/getHomeInfo';
export { getChats } from './queries/getChats';
export { getProfileData } from './queries/getProfileInfo';

//USER
export { getUserVehicles } from './queries/getUserVehicle';
export { getMessages } from './queries/getMessages';


//MUTATIONS
export { createMessage } from './mutations/createMessages';
export { getMyVehicles, getAllTags, createTrip } from './mutations/createTrips';
