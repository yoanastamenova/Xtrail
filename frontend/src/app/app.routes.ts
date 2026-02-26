import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { authGuard } from './guards/auth.guard';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';

export const routes: Routes = [
      {
        path: '',
        component: Home,
        title: 'Home Page'
    },
    {
      path: 'login',
      component: Login,
      title: 'Login Page'
    },
    {
      path: 'register',
      component: Register,
      title: 'Sign Up Page'
    },
    {
      path: 'profile',
      component: Profile,
      canActivate: [authGuard],
      title: 'Profile'
    },
    {
      path: 'forgot-password',
      component: ForgotPassword,
      title: 'Forgot password'
    },
    {
      path: 'reset-password',
      component: ResetPassword,
      title: 'Reset password'
    }
];
