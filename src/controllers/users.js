const Model = require ('../pg/model')

const userModel = new Model ('users');

const findUserbyId = async (user)=>{

    const query = `SELECT * FROM users WHERE id = $1`;
    try {
        const data = await userModel.pool.query(query,[user]);
        return data.rows
      } catch (err) {
        return err
      }
  }

  
const addOrCreateUser = async (googleObj)=>{

    const {googleId} = googleObj;
    const values = [googleId];
    const query = `INSERT INTO users VALUES($1) RETURNING id, id`;
    try {
        const check = await findUserbyId(googleId);
        if(check[0]){
           return check[0];
        }
        const data = await userModel.pool.query(query,values);
       return data.rows[0]
      } catch (err) {
       console.log(err)
       return
      }
}

const addUser = async (req,res)=>{

  const {id} = req.body;
  const values = [id];
  const query = `INSERT INTO users VALUES($1) RETURNING id, id`;
  try {
      const data = await userModel.pool.query(query,values);
     return data.rows[0]
    } catch (err) {
     console.log(err)
     return
    }
}




module.exports ={
    findUserbyId,
    addOrCreateUser,
    addUser
}