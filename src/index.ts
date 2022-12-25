import { Block, renderDOM, registerComponent }  from './core';
import LoginPage from './pages/login';

// import './app.css';

import Button from './components/button';
// import Link from './components/link';
// import Input from './components/input';
// import Layout from './components/layout';
//
registerComponent(Button);
// registerComponent(Link);
// registerComponent(Input);
// registerComponent(Layout);

// TODO: // Добавить MyComponent

// class MyComponent extends Block {
//      render(): string {
//         return ` {{{Button
//         title="Login222222"
//        onClick=onLogin
//       }}}`
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
    const App = new LoginPage();

    renderDOM(App);
});