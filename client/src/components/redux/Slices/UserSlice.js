import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {v4 as uuidV4} from 'uuid'
// const postContact = createAsyncThunk('/user/addContact',
//     async (user,contactUserId,name,thunkAPI)=>{
//         const response = await contactAPI(user,contactUserId,name)
//         return response;
//     }    
// )

export const userSlice = createSlice({
    name:'user',
    initialState:{
        id:0,
        contacts:[],
    },
    reducers:{
        login: (state, action) => {
            state.id = action.payload
        },
        createNew:(state)=>{
            state.id = uuidV4(); 
        },
        addContact:(state,action)=>{
            state.contacts=[...state.contacts,action.payload]
        }        
    },

})

export const {login,createNew, addContact} = userSlice.actions;

export default userSlice.reducer;