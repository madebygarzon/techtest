import { setupServer } from 'msw/node';
import { graphql } from 'msw';

export const server = setupServer(
  graphql.query(
    'GetUsers',
        // @ts-expect-error - error temporal de prueba
    (req, res, ctx) => {
      return res(
        ctx.data({
          users: [{ id: '', name: 'Test User', email: 'test@example.com' }],
        })
      );
    }
  )
);
