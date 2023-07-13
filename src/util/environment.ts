import { config } from 'dotenv';
import { from } from 'env-var';

const env = from(process.env, {});
config();

export const PORT = env.get('PORT').default(3000).asPortNumber();
