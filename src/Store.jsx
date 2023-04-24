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

        return {lastName:[newLastName,...state.lastName]}
    })
    
  }),{
    name:'storageZus',
  }
))


