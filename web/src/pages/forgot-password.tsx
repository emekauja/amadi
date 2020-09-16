import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import { useForgotPasswordMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from "next/link";


 const ForgotPassword: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [complete, setComplete] = useState(false);
    const [, forgotPassword] = useForgotPasswordMutation()

    return (
      <Wrapper variant="small">
      <Formik 
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) => complete ? <Box>check your inbox, we sent you an email</Box> : (
          <Form>
            <InputField 
              name="Email"
              placeholder="email"
              label="Email"
              type="email"
           />

           <Flex mt={2} >
             <Box ml="auto">
              <NextLink href="/login">
                <Link>know your password?</Link>
              </NextLink>
             </Box>
            </Flex>
            <Button 
                mt={4} 
                isLoading={isSubmitting} 
                type="submit"
                variantColor="purple"
              >
                forgot passwword
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)