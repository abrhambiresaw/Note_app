import { useEffect } from "react";

const useTitle = (title) => {
  
  useEffect(() => {
    const prevTitle = document.title // save the current title
    document.title = title // set the new title

    return () => document.title = prevTitle //cleanup on unmount/change
  }, [title])
}

export default useTitle