import postgres from "postgres"

const connectionString = process.env.DATABASE_URL

if (!connectionString) throw new Error("A variável de ambiente DATABASE_URL não foi encontrada")

const sql = postgres(connectionString)

export default sql