import { Dashboard, HomePage, Nopage, Signin, Signup, SignupSubmit } from '../pages';

const publicRoutes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/sign-up',
    component: Signup,
  },
  {
    path: '/sign-up-submit',
    component: SignupSubmit,
  },
  {
    path: '/sign-in',
    component: Signin,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '*',
    component: Nopage,
  },
];

export { publicRoutes };
