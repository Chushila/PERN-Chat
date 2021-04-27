const contactsAPI = {

    addContact(user,contactUserId,name){
        fetch('/contacts',{
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
    }
}

export default contactsAPI;