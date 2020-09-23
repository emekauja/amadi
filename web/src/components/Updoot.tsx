import React, { useState } from 'react'
import { Flex, IconButton } from '@chakra-ui/core';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';


interface UpdootProps {
  post: PostSnippetFragment;
}

export const Updoot: React.FC<UpdootProps> = ({ post }) => {
    const [loadinState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>('not-loading');
    const [, vote] = useVoteMutation();
    return (
      <Flex direction="column" justifyContent="center" alignItems="center"> 
        <IconButton 
          onClick={async () => {
            if (post.voteStatus === 1) {
              return;
            }
            setLoadingState('updoot-loading')
            await vote({ 
              postId: post.id,
              value: 1,
            });
            setLoadingState('not-loading')
          }}
          variantColor={post.voteStatus === 1 ? "green" : undefined}
          isLoading={loadinState === 'updoot-loading'}
          aria-label="updoot post"
          icon="chevron-up"
        />
        {post.points}
        <IconButton 
          onClick={async () => {
            if (post.voteStatus === -1) {
              return;
            }
            setLoadingState('downdoot-loading')
            await vote({
              postId: post.id,
              value: -1,
            });
            setLoadingState('not-loading')

          }}
          variantColor={post.voteStatus === -1 ? "red" : undefined}
          isLoading={loadinState === 'downdoot-loading'}
          aria-label="downdoot post"
          icon="chevron-down"
        />
      </Flex>
    );
}