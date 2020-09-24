import React from 'react'
import { Box, Link, IconButton } from '@chakra-ui/core';
import NextLink from 'next/link'
import { useNotLogInQuery, useDeletePostMutation } from "../generated/graphql";



interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}



export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ 
  id,
  creatorId
}) => {
  const [, deletePost] = useDeletePostMutation()
  const [{ data: userData }] = useNotLogInQuery();


    if (userData?.notLogIn?.id !== creatorId) {
      return null
    }
    return (
      <Box >
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <Link>
          <IconButton 
            mr={4}
            icon="edit"
            aria-label="Edit Post"
          />
        </Link>
      </NextLink>
      <IconButton 
        icon="delete"
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ id })
        }}
      />
    </Box>
    );
}