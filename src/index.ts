import { renderDOM, registerComponent }  from './core';
import mainPage from './pages/main';
import '/static/styles/style.css';


import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import textArea from './components/textArea';
import Layout from './components/layout';
import changeChat from './components/messenger/change-chat';
import Chat from './components/messenger/chat';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);
registerComponent(changeChat);
registerComponent(Chat);
registerComponent(textArea);


document.addEventListener("DOMContentLoaded", () => {

  const AppMainPage = new mainPage();

  renderDOM(AppMainPage);
});
