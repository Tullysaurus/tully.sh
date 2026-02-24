import { getCloudflareContext } from '@opennextjs/cloudflare';
import postgres from 'postgres';

const { env } = await getCloudflareContext({ async: true})
const connectionString = env.HYPERDRIVE.connectionString;

const sql = postgres(connectionString);

export default {sql};
export {sql}