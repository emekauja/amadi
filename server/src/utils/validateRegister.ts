import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    return  [
        {
          field: 'username',
          message: 'must be greater than 2 characters'
         },
        ];
      }
    

    if (options.username.includes('@')) {
      return [
          {
            field: 'username',
            message: 'can not include @ '
           },
          ];
      }

    if (!options.email.includes('@')) {
      return [
          {
            field: 'email',
            message: 'enter a valid email address'
           },
          ];
      }


    if (options.password.length <= 4) {
      return [
           {
            field: 'password',
            message: 'must be greater than 5 characters'
           },
          ];
        }

      return null
}