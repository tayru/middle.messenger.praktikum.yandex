import Block from '../../core/Block';
import template from 'bundle-text:./template.hbs';

import './auth.pcss';

// interface Props {
//     title: string;
//     text: string;
//     img: string;
//     onClick: () => void;
//
// }

console.log(template, 'template')

export class AuthPage extends Block {
    protected getStateFromProps() {
        this.state = {
            values: {
                login: '',
                password: '',
            },
            errors: {
                login: '',
                password: '',
            },
            onFocus: () => {
                console.log(this, 'onFocus')
            },

            onBlur: () => {
                console.log('onBlur')
            },

            onLogin: () => {
                // const loginData = {
                //     login: (this.refs.login.firstElementChild as HTMLInputElement).value,
                //     password: (this.refs.password.firstElementChild as HTMLInputElement).value
                // };
                //
                // const nextState = {
                //     errors: {
                //         login: '',
                //         password: '',
                //     },
                //     values: { ...loginData },
                // };
                //
                // if (!loginData.login) {
                //     nextState.errors.login = 'Login is required';
                // } else if (loginData.login.length < 4) {
                //     nextState.errors.login = 'Login should contain more than 3 chars';
                // }
                //
                // if (!loginData.password) {
                //     nextState.errors.password = 'Password is required';
                // }
                //
                // this.setState(nextState);
                console.log('action/login');

                // console.log('action/login', loginData);
            }
        }
    }
   render() {
    return template;
  }
}
