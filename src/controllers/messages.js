const Model = require ('../pg/model')
const messagesModel = new Model ('messages');


const insertMessage = async (req,res) => {

    const {text,conversation, user} = await req.body;
    const date = new Date (Date.now());

    try {
        const values = [conversation,text,date,user];
        const query = `INSERT INTO messages VALUES($1,$2,$3,$4)`;
        const data = await  messagesModel.pool.query(query,values);
          } catch (err) {
            console.log(err)
          }
    res.status(200).json({messages:'sent'})
}


const getMessages = async (req,res) =>{
    const {conversation} = await req.body;
    try {
      
        const values = [conversation];
        const query = `SELECT user_id,text,date FROM messages WHERE conversation_id = $1 ORDER BY date ASC`;
        const data = await messagesModel.pool.query(query,values)
        res.status(200).json(data.rows)
  
     } catch (err) {
       console.log(err)
     }
  }

module.exports = {
    insertMessage,
    getMessages
}