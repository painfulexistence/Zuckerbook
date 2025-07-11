import React, { createContext, useContext, useMemo } from "react"
import { createConsumer } from "@rails/actioncable"

const CableContext = createContext()

export const useCable = () => {
  const context = useContext(CableContext)
  if (!context) {
    throw new Error('useCable must be used within an CableProvider')
  }
  return context
}

export const CableProvider = ({ children }) => {
  const value = useMemo(() => createConsumer(), [])

	// const [consumer] = useState(() => createConsumer())
  // const [subscriptions, setSubscriptions] = useState(new Map())

  // const subscribe = useCallback((channelName, callbacks) => {
  //   if (!consumer) return null

  //   const subscription = consumer.subscriptions.create(channelName, callbacks)

  //   setSubscriptions(prev => new Map(prev).set(channelName, subscription))

  //   return subscription
  // }, [consumer])

  // const unsubscribe = useCallback((channelName) => {
  //   setSubscriptions(prev => {
  //     const subscription = prev.get(channelName)
  //     if (subscription) {
  //       subscription.unsubscribe()
  //       const newMap = new Map(prev)
  //       newMap.delete(channelName)
  //       return newMap
  //     }
  //     return prev
  //   })
  // }, [])

  // const disconnect = useCallback(() => {
  //   if (consumer) {
  //     consumer.disconnect()
  //   }
  // }, [consumer])

  // const value = useMemo(() => ({
  //   consumer,
  //   subscribe,
  //   unsubscribe,
  //   disconnect,
  //   subscriptions: Array.from(subscriptions.keys())
  // }), [consumer, subscribe, unsubscribe, disconnect, subscriptions])

  return (
    <CableContext.Provider value={value}>
      { children }
    </CableContext.Provider>
  )
}