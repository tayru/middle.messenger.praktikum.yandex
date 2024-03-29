import { getByTestId,  queryByTestId, waitFor } from '@testing-library/dom'
import { renderBlock, step } from '../../tests/renderUtils';
import SetPage from './settings';

const USER_MOCK = {
  avatar: "/d66cf98f-05dc-49ba-8d2b-c1db0c5888c3/761d694b-39b5-4dee-ab15-78a2bf05461d_12.png",
  displayName: "Борис джонс",
  email: "johndoe2@johndoe2.johndoe2",
  firstName: "Борис",
  id: 3094,
  login: "johndoe2",
  phone: "89137909090",
  secondName: "джонс",
};

describe('pages/Profile', () => {

  // ИНТЕГРАЦИОННЫЙ-тест на пользовательский сценарий
  it.skip('should logout from profile and redirect to auth page', async () => {
    await step('render profile page to dom', () => {
      renderBlock({
        Block: SetPage,
        props: {},
        state: {
          screen: 'settings',
          appIsInited: true,
          user: USER_MOCK
        },
      });
    });

    await step('click to logout button', () => {
      const button = getByTestId(document.body, 'logout-btn');
      button.click();
    });

    // TODO: добавить проверка показа лоадера

    await step('wait openning onboarding page', async () => {
      await waitFor(() =>
        expect(queryByTestId(document.body, 'auth-screen')).toBeInTheDocument()
      );
    });

    await step('check state', async () => {
      expect(window.store.getState().screen).toEqual('AuthPage');
      expect(window.store.getState().user).toEqual(null);
    });
  });
});
