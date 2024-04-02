import { useState, useEffect } from "react"
import { useQuestionStore } from "./useQuestionStore"

const useHydration = () => {
    const [hydrated, setHydrated] = useState(false)
  
    useEffect(() => {
      // Note: This is just in case you want to take into account manual rehydration.
      // You can remove the following line if you don't need it.
      const unsubHydrate = useQuestionStore.persist.onHydrate(() => setHydrated(false))
  
      const unsubFinishHydration = useQuestionStore.persist.onFinishHydration(() => setHydrated(true))
  
      setHydrated(useQuestionStore.persist.hasHydrated())
  
      return () => {
        unsubHydrate()
        unsubFinishHydration()
      }
    }, [])
  
    return hydrated
  }