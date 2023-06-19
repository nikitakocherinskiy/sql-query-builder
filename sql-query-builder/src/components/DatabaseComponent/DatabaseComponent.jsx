/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import styles from './DatabaseComponent.module.css'
import axios from 'axios'

const DatabaseComponent = ({ query, database }) => {
	const [headers, setHeaders] = useState([])

	const [data, setData] = useState([])

	const fetchDatabase = async () => {
		try {
			const response = await axios.post('http://localhost:5000/get-data', {
				databaseType: database,
				query: `${query}`,
			})
			setHeaders(response.data.fields.map((col) => col.name))
			setData(response.data.rows)
			console.log(response.data.rows)
		} catch (error) {
			console.error('Error fetching columns:', error)
		}
	}

	useEffect(() => {
		fetchDatabase(data)
	}, [query])

	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr>
						{headers.map((header, index) => (
							<th key={index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((el, index) => (
						<tr key={index}>
							{headers.map((header, index) => {
								if (header === 'picture') {
									return <td key={index}>picture</td>
								}
								return <td key={index}>{el[header]}</td>
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DatabaseComponent
