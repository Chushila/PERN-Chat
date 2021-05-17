
export const getUser = () =>{
    try{
    return fetch('/users',{credentials:"include"}).catch(console.log('no user')).then(data=>(data.json() || 'no user'))
    
    }catch(e){
        console.log(e)
    }
}

export const createUser = (id) =>{
  fetch('/users',{
    method:"POST",
        body:JSON.stringify({
          id:id
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
  })
}


