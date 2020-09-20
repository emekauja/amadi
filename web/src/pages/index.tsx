import { withUrqlClient } from "next-urql"
import { Layout } from "../components/Layout"
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient"
import NextLink from 'next/link'
import { Link, Stack, Text, Heading, Box, Flex, Button } from "@chakra-ui/core";
import { useState } from "react";


const Index = () => {
  const [variables, setVariables] = useState({ 
    limit: 10, 
    cursor: null as null | string
  });
  const [{ data, fetching }] = usePostsQuery({
    variables
  });
  if (!fetching && !data) {
    return <div>you have no posts</div>
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>Amåd!</Heading>
        <NextLink href='/create-post'>
        <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && !data ? ( 
        <div>loading...</div>
       ):(
         <Stack spacing={8}>
            {data!.posts.posts.map(p => (
            <Box p={5} key={p.id} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{p.title}</Heading>
            <Text mt={4}>{p.textSnippet}</Text>
          </Box>))}
         </Stack>
         )}
         {data && data.posts.hasMore ? (
         <Flex>
          <Button onClick={() => {
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            })
          }} isLoading={fetching} m="auto" my={4}>
            load more
          </Button>
         </Flex>
         ) : null}
    </Layout>

  );
};

export default withUrqlClient(createUrqlClient, {ssr: true}) (Index)
