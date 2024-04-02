import { Pool, PoolClient } from "pg";

let conn: PoolClient;
// @ts-ignore
if (!conn) {
  // @ts-ignore
  conn = new Pool({
    user: 'admin',
    password: 'admin',
    host: 'localhost',
    // @ts-ignore
    port: 5432,
    database: 'quizz',
  });
}

export default conn;
