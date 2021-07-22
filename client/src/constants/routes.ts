import ValueOf from '../types/ValueOf';

const ROUTES = {
  ROOT: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  PROJECTS_SEARCH: '/projects/search',
  HOME: '/home',
};

export const NON_AUTH_ROUTES: ValueOf<typeof ROUTES>[] = [
  ROUTES.ROOT,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

export const AUTH_ROUTES: ValueOf<typeof ROUTES>[] = Object.values(ROUTES).filter(
  (route) => !NON_AUTH_ROUTES.includes(route)
);

export default ROUTES;
