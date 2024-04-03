import { neon } from '@neondatabase/serverless';
// @ts-ignore
const sql = neon(process.env.NEON_URL);

export default sql