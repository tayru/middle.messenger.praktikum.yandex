// require("babel-core/register");

import { renderDOM, registerComponent }  from './core';

import OnboardingPage from './pages/main';
import LoginPage from './pages/login';
import ErrorPage from './pages/error';
import MainPage from './pages/main';
import AuthPage from './pages/auth';
import RegPage from './pages/register';
import SetPage from './pages/settings';

import MessengerPage from './pages/messenger';

import '/static/styles/style.css';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';
import changeChat from './components/messenger/change-chat';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);
registerComponent(changeChat);


import * as Nesting from '../static/assets/icons/Nesting.svg'
import * as CPU from '../static/assets/icons/CPU.svg'

document.addEventListener("DOMContentLoaded", () => {
  // DEV: Расскоментировать нужно страницу для отображения

  const App404 = new ErrorPage(
      {
        title: 'error', text: 'Не туда попали', img: Nesting
      }
  );

  const App500 = new ErrorPage(
      {
        title: '500', text: 'Мы уже фиксим', img: CPU
      }
  );

    const AppAuth = new AuthPage(

    );

    const AppReg = new RegPage(
        {
            title: '500', text: 'Мы уже фиксим', img: CPU
        }
    );

    const AppSet = new SetPage(
        {
            title: '500', text: 'Мы уже фиксим', img: CPU
        }
    );

    const AppMessengerPage = new MessengerPage(
        {
            title: '500', text: 'Мы уже фиксим', img: CPU
        }
    );




  const AppMain = new MainPage()

  const App1 = new OnboardingPage({
    links: [
      {to: '#signup', text: 'signup22222'},
      {to: '#login', text: 'login111111'},
    ]
  });

  // renderDOM(App);
  renderDOM(AppAuth);
});
