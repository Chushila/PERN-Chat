const Model = require ('../pg/model')
const {findUserbyId} = require ('./users')
const contactsModel = new Model ('contacts');


const selectContactByUser = async (req, res) => {
  const {user} = await req.body
  const query = `SELECT contact_user_id,name FROM contacts WHERE user_id = $1`;
  try {
    const data = await contactsModel.pool.query(query,[user]);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
}; 



const addContact = async (req,res)=>{

    const {user,contactUserId,name} = await req.body;
    const values = [user,contactUserId,name];
    const query = `INSERT INTO contacts VALUES($1, $2, $3) RETURNING contact_user_id`;
    try {
        const data = await contactsModel.pool.query(query,values);
        res.status(200).json( data.rows );
      } catch (err) {
        res.status(400).json({ messages: err.stack });
      }
}

const contactPage = async (req, res) => {
  try {
    const data = await contactsModel.select('user_id, contact_user_id, name');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
}; 

module.exports = {
    addContact,
    contactPage,
    selectContactByUser
};