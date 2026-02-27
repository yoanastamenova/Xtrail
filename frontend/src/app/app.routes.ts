import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Profile } from './features/profile/profile';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login Page',
  },
  {
    path: 'register',
    component: Register,
    title: 'Sign Up Page',
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
    title: 'Profile',
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
    title: 'Forgot password',
  },
  {
    path: 'reset-password',
    component: ResetPassword,
    title: 'Reset password',
  },
];
