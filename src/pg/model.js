const pool = require('./pool')

const executeQueryArray = async (arr) => new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });

class Model {
    constructor(table) {
      this.pool = pool;
      this.table = table;
  
      this.pool.on(
        'error',
        (err, client) => `Error, ${err}, on idle client${client}`
      );
    }
  
    async select(columns, clause) {
      let query = `SELECT ${columns} FROM ${this.table}`;
      if (clause) query += clause;
      return this.pool.query(query);
    }
  
    async insertWithReturn(columns, values) {
      const query = `
            INSERT INTO ${this.table}(${columns})
            VALUES (${values})
            RETURNING id, ${columns}
        `;
      return this.pool.query(query);
    }
  
    async alterTable(input, clause) {
      const qArray = [];
      for (const [ key, value ] of Object.entries(input)) {
        const values = [value];
        let query = `
            UPDATE ${this.table}
            SET ${key} = $1
        `;
        if (clause) query += clause;
        this.pool.query(query,values)
      }
      return executeQueryArray(qArray);
    }
  
    async getLastId(username, clause) {
      let query = `WITH get_max(max_id) AS (SELECT MAX(id) FROM orders WHERE users = '${username}')
      SELECT id
      FROM orders,get_max
      WHERE orders.id = get_max.max_id;`;
      if (clause) query += clause;
      return this.pool.query(query);
    }
  
    async insertInCustomTable(table, values) {
      const query = `
            INSERT INTO ${table}
            VALUES (${values})
            
        `;
      return this.pool.query(query);
    }
  }
  
  module.exports = Model;