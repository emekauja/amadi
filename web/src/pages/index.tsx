import { withUrqlClient } from "next-urql"
import { Layout } from "../components/Layout"
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient"
import NextLink from 'next/link'
import { Link } from "@chakra-ui/core";


const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href='/create-post'>
       <Link>create post</Link>
      </NextLink>
      <br />
      {!data ? ( 
        <div>loading...</div>
       ):(
         data.posts.map(p => <div key={p.id}>{p.title}</div>)
         )}
    </Layout>

  );
};

export default withUrqlClient(createUrqlClient, {ssr: true}) (Index)
