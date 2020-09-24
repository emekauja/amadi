import React from 'react'
import { Box, Link, Flex, Button, Heading } from '@chakra-ui/core';
import NextLink from 'next/link'
import { useLogoutMutation, useNotLogInQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: logoutfetching}, logout] = useLogoutMutation();
    const [{ data, fetching }] = useNotLogInQuery({
      pause: isServer(),
    });

    let body = null

    //data is loading
    if (fetching) {

      //user not logged in
    } else if (!data?.notLogIn) {
      body = (
        <>
         <NextLink href="/login">
            <Link mr={4}>
              login
            </Link> 
          </NextLink>
          <NextLink href="/register">
            <Link>
              register
            </Link>
          </NextLink>
        </>
      )
    //user is logged in
    } else {
    body = (
      <Flex align="cenetr">
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        <Box alignSelf="center" mr={2}>{data.notLogIn.username}</Box>
        <Button 
          onClick={() => logout()}
          isLoading={logoutfetching}
          variant="link"
        >
            logout
        </Button>
      </Flex>
    )
    }
    return (
      <Flex position='sticky' top={0} zIndex={1} bg='tan'  p={4}> 
        <Flex flex={1} m="auto" align="center" maxW={800}>
          <NextLink href="/">
            <Link>
              <Heading>Amåd!</Heading>
            </Link>
          </NextLink>
          <Box ml={"auto"}>{body}</Box>
        </Flex>
      </Flex>
    );
}