const Model = require ('../pg/model')
const conversationModel = new Model ('conversations');

const insertRecipients = async (recipients,convesationId) => {
    recipients.forEach(el=>{
        const values = [el];
        const query = `INSERT INTO conversation_users VALUES('${convesationId}',$1)`;
        try {
           conversationModel.pool.query(query,values);
          } catch (err) {
            console.log(err)
          }
    })
    
}

const findConversationByUser = async (userId) => {
 
      const values = [userId];
      const query = `SELECT conversation_id FROM conversation_users WHERE user_id = $1`;
      try {
         const data = await conversationModel.pool.query(query,values);
         return data.rows
        } catch (err) {
          console.log(err)
        }
 
  
}

const findUserByConversation = async (conversation) => {
 
  const values = [conversation];
  const query = `SELECT user_id FROM conversation_users WHERE conversation_id = $1`;
  try {
     const data = await conversationModel.pool.query(query,values);
     return data.rows
    } catch (err) {
      console.log(err)
    }


}
const createConversation = async (req,res) => {
    const {recipients,user,id} = await req.body;
    recipients.push(user)
    const query = `INSERT INTO conversations VALUES('${id}') RETURNING id, id;`;
    try {
        const data = await conversationModel.pool.query(query);
        insertRecipients(recipients,data.rows[0].id)
        res.status(200).json({ messages: data.rows });
      } catch (err) {
        res.status(200).json({ messages: err.stack });
      }
}

const getConversationsForUser = async (req,res) =>{
  const {user} = await req.body;
  const conversationsArray = await findConversationByUser(user);
  try {

    const call = await Promise.all(conversationsArray.map(async (conversation)=>{
      const values = [conversation.conversation_id,user];
      const query = `SELECT user_id FROM conversation_users WHERE conversation_id = $1 AND user_id != $2`;
      const data = await conversationModel.pool.query(query,values)
      return  {conversation:conversation.conversation_id,recipients:data.rows.map(el=>el.user_id)}
    }))
    res.status(200).json({messages:call})

   } catch (err) {
     console.log(err)
   }
}


module.exports={
    createConversation,
    getConversationsForUser,
    findUserByConversation
}