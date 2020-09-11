import React from 'react'
import { Box, Link, Flex, Button } from '@chakra-ui/core';
import NextLink from 'next/link'
import { useLogoutMutation, useNotLogInQuery } from '../generated/graphql'

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: logoutfetching}, logout] = useLogoutMutation();
    const [{ data, fetching }] = useNotLogInQuery();
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
      <Flex>
        <Box mr={2}>{data.notLogIn.username}</Box>
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
      <Flex bg='tan'  p={4}> 
        <Box ml={'auto'}> 
          {body}
        </Box>
      </Flex>
    );
}