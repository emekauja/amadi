import { useRouter } from "next/router"
import { useEffect } from "react";
import { useNotLogInQuery } from "../generated/graphql"


 export const useIsAuth = () => {
  const [{ data, fetching }] = useNotLogInQuery()
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.notLogIn) {
      router.replace('/login?next=' + router.pathname)
    }
   },  [fetching, data, router])
 }