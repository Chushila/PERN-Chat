import { createSlice } from "@reduxjs/toolkit";
import {loadContacts} from '../../../api/contactsAPI'
import {loadConversations} from '../../../api/convesationsAPI'
import {loadMessages} from '../../../api/messagesAPI'
export const userSlice = createSlice({
    name:'user',
    initialState:{
        id:0,
        socket:[],
        contacts:[],
        conversations:[],
        selectedConversation:{},
    },
    reducers:{

        login: (state, action) => {
            state.id = action.payload
        },
        createNew:(state,action)=>{
            state.id = action.payload; 
        },
        addContact:(state,action)=>{
            state.contacts=[...state.contacts,action.payload]
        },
        addConversation:(state,action)=>{
            state.conversations.push({recipients:action.payload.selectedContactsIds,messages:[],conversation:action.payload.id})
        },
        selectConversation:(state,action)=>{
            state.selectedConversation = action.payload;
        },
        addConversationIo:(state,action)=>{
            state.conversations.push(action.payload)
        },
        addMessage:(state,action)=>{
            state.selectedConversation.messages.push(action.payload)
        }        
    },
    extraReducers:{
        [loadContacts.fulfilled]:(state,action)=>{
            state.contacts.push(...action.payload)
        },
        [loadConversations.fulfilled]:(state,action)=>{
            state.conversations.push(...action.payload)
        },
        [loadMessages.fulfilled]:( state, action)=>{
            state.conversations.find(el=>el.conversation === action.payload.conversation).messages = action.payload.messages;
            
        }
    }

})

export const {login,createNew, addContact, addConversation, selectConversation, addConversationIo,addMessage} = userSlice.actions;

export default userSlice.reducer;