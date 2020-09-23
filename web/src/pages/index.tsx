import { withUrqlClient } from "next-urql"
import { Layout } from "../components/Layout"
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient"
import NextLink from 'next/link'
import { Link, Stack, Text, Heading, Box, Flex, Button } from "@chakra-ui/core";
import { useState } from "react";
import { Updoot } from "../components/Updoot";


const Index = () => {
  const [variables, setVariables] = useState({ 
    limit: 15, 
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
      {fetching && !data ? ( 
        <div>loading...</div>
       ):(
         <Stack spacing={8}>
            {data!.posts.posts.map(p => (
            <Flex p={5} key={p.id} shadow="md" borderWidth="1px">
            <Updoot post={p} />
            <Box>
              <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                <Link>
                  <Heading fontSize="xl">{p.title}</Heading> 
                </Link>
              </NextLink>
              <Text>posted by {p.creator.username}</Text>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          </Flex>))}
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
