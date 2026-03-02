import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Profile } from './features/profile/profile';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { authGuard } from './core/guards/auth.guard';
import { NewRun } from './features/runs/new-run/new-run';
import { AllRuns } from './features/runs/all-runs/all-runs';

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
  {
    path: 'runs/new',
    component: NewRun,
    canActivate: [authGuard],
    title: 'New run',
  },
  {
    path: 'runs/all',
    component: AllRuns,
    canActivate: [authGuard],
    title: 'All Runs',
  },
];
