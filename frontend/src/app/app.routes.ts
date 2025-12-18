import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';

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
    }
];
