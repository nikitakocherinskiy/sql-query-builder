const express = require('express')
const app = express()
const { Pool } = require('pg')
const mysql = require('mysql')
const cors = require('cors')
app.use(express.json({ charset: 'utf-8' }))
const port = 5000

// const dbConfig = {
// 	host: 'localhost',
// 	port: '5432',
// 	user: 'postgres',
// 	password: 'nikita1947',
// 	database: 'northwind',
// }

let dbConfig = {}

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

app.use(cors())

app.use(express.json())

app.post('/execute-query', async (req, res) => {
	console.log('Received request:', req.body)
	const { dbData, databaseType, query } = req.body
	Object.assign(dbConfig, dbData)
	try {
		let result
		if (databaseType === 'postgresql') {
			const pgPool = new Pool({
				host: dbConfig.host,
				port: dbConfig.port,
				user: dbConfig.user,
				password: dbConfig.password,
				database: dbConfig.databaseName,
			})
			result = await pgPool.query(query)
		} else if (databaseType === 'mysql') {
			result = await new Promise((resolve, reject) => {
				mysqlConnection.query(query, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})
		}

		res.json(result)
	} catch (error) {
		console.error('Error executing query:', error)
		res.status(500).json({ error: 'Error executing query.' })
	}
})

app.post('/columns', async (req, res) => {
	const { databaseType, query } = req.body
	try {
		let result
		if (databaseType === 'postgresql') {
			const pgPool = new Pool({
				host: dbConfig.host,
				port: dbConfig.port,
				user: dbConfig.user,
				password: dbConfig.password,
				database: dbConfig.databaseName,
			})
			result = await pgPool.query(query)
		} else if (databaseType === 'mysql') {
			result = await new Promise((resolve, reject) => {
				mysqlConnection.query(query, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})
		}

		res.json(result)
	} catch (error) {
		console.error('Error executing query:', error)
		res.status(500).json({ error: 'Error executing query.' })
	}
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
