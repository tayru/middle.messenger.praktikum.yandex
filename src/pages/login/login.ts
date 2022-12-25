import Block from '../../core/Block';

export class LoginPage extends Block {
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
      onLogin: () => {
        const loginData = {
          login: (this.refs.login.firstElementChild as HTMLInputElement).value,
          password: (this.refs.password.firstElementChild as HTMLInputElement).value
        };

        const nextState = {
          errors: {
            login: '',
            password: '',
          },
          values: { ...loginData },
        };

        if (!loginData.login) {
          nextState.errors.login = 'Login is required';
        } else if (loginData.login.length < 4) {
          nextState.errors.login = 'Login should contain more than 3 chars';
        }

        if (!loginData.password) {
          nextState.errors.password = 'Password is required';
        }

        this.setState(nextState);

        console.log('action/login', loginData);
      }
    }
  }

  render() {

    // language=hbs
    return `
      <form class="login-form form">
        1111111
        {{{Button
        text="Login222222"
        onClick=onLogin
        }}}
      </form>

    `;
  }
}
