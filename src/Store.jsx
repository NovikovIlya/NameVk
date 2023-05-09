import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export const  useLastName = create(
    persist(
    (set)=>({
    lastName: [

    ],
    
    addLastName: (test) => set(state => {
        const newLastName = test
        const array2 = [newLastName,...state.lastName]
        return {lastName:[...new Set(array2)]}
    })
    
  }),{
    name:'storageZus',
  }
))


