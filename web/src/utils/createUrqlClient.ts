import { dedupExchange, fetchExchange } from "urql";
import { 
  LogoutMutation, 
  NotLogInQuery, 
  NotLogInDocument, 
  LoginMutation, 
  RegisterMutation 
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange } from '@urql/exchange-graphcache';




export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const
  },
  exchanges: [dedupExchange, cacheExchange({
    updates: {
      Mutation: {
        logout: (_result, args, cache, info) => {
          betterUpdateQuery<LogoutMutation, NotLogInQuery>(
            cache,
            { query: NotLogInDocument },
            _result,
            () => ({ notLogIn: null })
          )
        },
        login: (_result, args, cache, info) => {
          betterUpdateQuery<LoginMutation, NotLogInQuery>(
            cache,
            { query: NotLogInDocument },
            _result,
            (result, query) => {
              if (result.login.errors) {
                return query;
              } else {
                return {
                  notLogIn: result.login.user,
                };
              }
            }
          );
        },
        register: (_result, args, cache, info) => {
          betterUpdateQuery<RegisterMutation, NotLogInQuery>(
            cache,
            { query: NotLogInDocument },
            _result,
            (result, query) => {
              if (result.register.errors) {
                return query;
              } else {
                return {
                  notLogIn: result.register.user,
                };
              }
            }
          );
        },
      },
    },
  }), 
  ssrExchange,
  fetchExchange],
});