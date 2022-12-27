import Block from '../../core/Block';
import { renderDOM, registerComponent }  from '../../core';

import ErrorPage from '../../pages/error';
import AuthPage from '../../pages/auth';
import RegPage from '../../pages/register';
import SetPage from '../../pages/settings';
import MessengerPage from '../../pages/messenger';
import Button from '../../components/button';
registerComponent(Button);


import * as Nesting from '../../../static/assets/icons/Nesting.svg'
import * as CPU from '../../../static/assets/icons/CPU.svg'



export class MainPage extends Block {

  protected getStateFromProps() {
    this.state = {
      
          ErrorPage404: (e: Event) => {
          e.preventDefault();
          renderDOM(new ErrorPage({ title: '404', text: 'Не туда попали', img: Nesting  }
          ));
        },

      ErrorPage500: (e: Event) => {
        e.preventDefault();
        renderDOM(new ErrorPage({ title: '500', text: 'Мы уже фиксим', img: CPU  }
        ));
      },

      CreateAppAuth: (e: Event) => {
        e.preventDefault();
        renderDOM(new AuthPage());
      },

      CreateRegPage: (e: Event) => {
        e.preventDefault();
        renderDOM(new RegPage());
      },

      CreateSetPage: (e: Event) => {
        e.preventDefault();
        renderDOM(new SetPage());
      },

      CreateMessengerPage: (e: Event) => {
        e.preventDefault();
        renderDOM(new MessengerPage());
      },
    }
  }

  render() {

    // language=hbs
    return `
      <h1>Список страниц</h1>
      <ul>
        <li>
        {{{Button
        text="ErrorPage404"
        onClick=ErrorPage404
        }}}
        </li>
        <li>
          {{{Button
          text="ErrorPage500"
          onClick=ErrorPage500
          }}}
        </li>

        <li>
          {{{Button
          text="Auth"
          onClick=CreateAppAuth
          }}}
        </li>

        <li>
          {{{Button
          text="Registation"
          onClick=CreateRegPage
          }}}
        </li>

        <li>
          {{{Button
          text="Settings"
          onClick=CreateSetPage
          }}}
        </li>
        <li>
          {{{Button
          text="Messenger"
          onClick=CreateMessengerPage
          }}}
        </li>
        
        
      </ul>

    `;
  }
}
