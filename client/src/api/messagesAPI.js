import {createAsyncThunk} from '@reduxjs/toolkit'

export const postMessage = (text,conversationId,user) => {
    fetch('/messages',{
        method:"POST",
            body:JSON.stringify({
                conversation:conversationId,
                text:text,
                user:user,
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
    })

}

export const getMessages = (conversation) =>{
        return fetch('users/messages',{
            method:"POST",
            body:JSON.stringify({
                conversation:conversation
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
}

export const loadMessages = createAsyncThunk(
    "messages/getUserMessages",
    async (conversation,thunkAPI) => {
      const data = await getMessages(conversation);
      const json = await data.json();
      return {messages:json, conversation:conversation};
    }
  );
