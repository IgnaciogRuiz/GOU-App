//index.ts permite exportar todos los componentes desde una sola ruta.

//FORM
export { default as VehiculoForm } from './form/vehiculoFormComponent';
export { default as CustomInput } from './form/inputComponent';


//UI
export { default as CustomButton } from './ui/buttonComponent';
export { default as Title } from './ui/title';


//LAYOUT
export { default as Header } from './layout/headerComponent';
export { default as FadeInView } from './layout/fadeInComponent';
export { default as OvalBackground } from './layout/ovalBackgroungComponent';
export { default as BackButton } from './layout/backButtonComponent';
export { default as ProfileHeader } from './layout/profileHeaderComponent';

//MESSAGE
export { default as ChatItem } from './message/chatItemComponent';

//PROFILE
export { default as MenuItem } from './perfil/menuItemComponent';
export { default as UserInfoCard } from './perfil/userInfoCardComponent';


//HOME
export { default as HomeHeader } from './home/homeHeaderComponent';
export { default as QuickActions } from './home/quickActionsComponent';
export { default as SectionHeader } from './home/sectionHeaderComponent';
export { default as ReservationCard } from './home/reservationCardComponent';
export { default as PublishedTripCard } from './home/publishedTripCard';
export { default as ActivityItem } from './home/activityItemComponent';
export { default as MyReservationsSection } from './home/myReservationSection';
export { default as MyPublishedTripsSection } from './home/myPublishedSection';
export { default as RecentActivitySection } from './home/recentActivitySection';

//LOADDER
export { default as Loader } from './layout/loaderComponent';