import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.post(`${process.env.API_ENDPOINT}/auth/signin`, (req, res, ctx) => {
    console.log('Call signin endpoind');
    console.log(req)

    return res(
      ctx.status(401),
      ctx.json({
        reason: 'Login or password is incorrect'
      })
    );
  }),
  rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (req, res, ctx) => {
    console.log('Call logout endpoind');
    console.log(req)

    return res(ctx.status(200));
  }),
  rest.get(`${process.env.API_ENDPOINT}/auth/user`, (req, res, ctx) => {
    console.log('Call user endpoind');
    console.log(req)
    return res(ctx.status(200));
  }),
];

export const server = setupServer(...handlers);
