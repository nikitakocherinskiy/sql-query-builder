// const express = require('express')
// const app = express()
// const { Pool } = require('pg')
// const mysql = require('mysql')
// const cors = require('cors')
// app.use(express.json({ charset: 'utf-8' }))

// // const dbConfig = {
// // 	host: 'localhost',
// // 	port: '5432',
// // 	user: 'postgres',
// // 	password: 'nikita1947',
// // 	database: 'northwind',
// // }

// let dbConfig = {
// 	host: '',
// 	port: '',
// 	user: '',
// 	password: '',
// 	database: '',
// }

// const pgPool = new Pool({
// 	host: dbConfig.host,
// 	port: dbConfig.port,
// 	user: dbConfig.user,
// 	password: dbConfig.password,
// 	database: dbConfig.database,
// })

// const mysqlConnection = mysql.createConnection({
// 	host: dbConfig.host,
// 	port: dbConfig.port,
// 	user: dbConfig.user,
// 	password: dbConfig.password,
// 	database: dbConfig.database,
// })

// app.use(cors())

// app.use(express.json())

// app.post('/execute-query', async (req, res) => {
// 	const { databaseType, query } = req.body

// 	try {
// 		let result

// 		if (databaseType === 'postgresql') {
// 			result = await pgPool.query(query)
// 		} else if (databaseType === 'mysql') {
// 			result = await new Promise((resolve, reject) => {
// 				mysqlConnection.query(query, (error, results) => {
// 					if (error) {
// 						reject(error)
// 					} else {
// 						resolve(results)
// 					}
// 				})
// 			})
// 		}

// 		res.json(result)
// 	} catch (error) {
// 		console.error('Error executing query:', error)
// 		res.status(500).json({ error: 'Error executing query.' })
// 	}
// })

// app.post('/api/connect', async (req, res) => {
// 	const { host, port, username, password, database } = req.body

// 	const clientPassword = String(password)

// 	dbConfig = { host, port, username, password: clientPassword, database }

// 	res.json({ dbConfig })
// })

// const port = 5000
// app.listen(port, () => {
// 	console.log(`Server running on port ${port}`)
// })

// const express = require('express')
// const app = express()
// const PORT = process.env.PORT || 5000

// app.use(cors())

// // API route for executing queries
// app.post('/api/query', (req, res) => {
// 	const { query, connectionDetails } = req.body
// 	// Execute the query using the appropriate database client library
// 	// and return the results
// 	// Example:
// 	// const results = executeQuery(query, connectionDetails);
// 	// res.json(results);
// })

// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}`)
// })
