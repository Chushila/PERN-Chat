import {createAsyncThunk} from '@reduxjs/toolkit'

export const createConversation = (recipients,user,id) =>{
    console.log(recipients)
    return fetch('/conversations',{
        method:"POST",
            body:JSON.stringify({
                user:user,
                recipients:recipients,
                id:id,
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
    })
}

export const getUserConversation = (user) => {
    return fetch('users/conversations',{
        method:"POST",
        body:JSON.stringify({
            user:user,
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

export const loadConversations = createAsyncThunk(
    "conversations/getUserConversations",
    async (user,thunkAPI) => {
      const data = await getUserConversation(user);
      const json = await data.json();
      return json.messages;
    }
  );
