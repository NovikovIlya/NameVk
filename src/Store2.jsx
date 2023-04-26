import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid'



export const useOldData = create(
  persist(
  (set)=>({
      olderData:[],
      addOlderData: (test)=>set(state=>{
        return {olderData:[test,...state.olderData]}
      })
  }),
  {
    name:'OlderstorageZus',
  }
))
