import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React from 'react'
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useRouter } from "next/router";
import { useIsAuth } from '../utils/useIsAuth';



 const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const [, createPost] = useCreatePostMutation();
    return (
      <Layout variant="small">
        <Formik 
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const { error } = await createPost({ input: values });
            if (!error) {
              router.push('/');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField 
                name="title"
                placeholder="title"
                label="Title"
             />
             <Box mt= {4}>
              <InputField 
                name="text"
                placeholder="text..."
                label="Body"
                textarea
              />
             </Box>
              <Button 
                  mt={4} 
                  isLoading={isSubmitting} 
                  type="submit"
                  variantColor="purple"
                >
                  create post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>

    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);

