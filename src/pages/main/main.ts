import Block from '../../core/Block';


export class MainPage extends Block {

  protected getStateFromProps() {
    this.state = {

      onLogin: () => {
        console.log('click');
      }
    }
  }

  render() {

    // language=hbs
    return `111
      <ul>
        <li>
        {{{Button
        text="error"
        onClick=onLogin
        }}}
        </li>
      </ul>

    `;
  }
}
