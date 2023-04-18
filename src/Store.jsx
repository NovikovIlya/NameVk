import { create } from 'zustand'
import { nanoid } from 'nanoid'

export const  useLastName = create((set)=>({
    lastName: [
        // { id:1, test: 123},
    ],
    // newLastName: '',
    addLastName: (test) => set(state => {
        

        const newLastName = test

        return {lastName:[newLastName,...state.lastName]
        }
    })
    
}))

