import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid'



export const useOldData = create(
  persist(
  (set)=>({
      olderData:[],
      addOlderData: (test)=>set(state=>{
        const array2 = [test,...state.olderData]
        return {olderData:[...new Set(array2)]}
      })
  }),
  {
    name:'OlderstorageZus',
  }
))
