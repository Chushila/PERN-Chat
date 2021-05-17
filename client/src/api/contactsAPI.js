import {createAsyncThunk} from '@reduxjs/toolkit'

const contactsAPI = {

    addContact(user,contactUserId,name){
        return fetch('/contacts',{
            method:"POST",
            body:JSON.stringify({
                user:user,
                contactUserId:contactUserId,
                name:name
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    },
    getUserContacts(user){
        return fetch('users/contacts',{
            method:"POST",
            body:JSON.stringify({
                user:user,
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }
} 

export const loadContacts = createAsyncThunk(
    "contacts/getContacts",
    async (user,thunkAPI) => {
      const data = await contactsAPI.getUserContacts(user);
      const json = await data.json();
      return json.messages;
    }
  );


export default contactsAPI;