import { useEffect, useState } from 'react'
import axios from 'axios'
import ColumnSelection from '../ColumnSelection/ColumnSelection'
import styles from './TableSelection.module.css'

/* eslint-disable react/prop-types */
const TableSelection = ({ tableList, database }) => {
	const [isTables, setIsTables] = useState(false)
	const [selectedOption, setSelectedOption] = useState('')
	const [columnList, setColumnList] = useState([])

	useEffect(() => {
		if (tableList.length > 0) {
			setIsTables(true)
		}
	}, [tableList])

	const handleChange = async (e) => {
		setSelectedOption(e.target.value)
		try {
			const response = await axios.post('http://localhost:5000/columns', {
				databaseType: database,
				query: `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${e.target.value}';`,
			})
			setColumnList(response.data.rows.map((col) => col.column_name))
		} catch (error) {
			console.error('Error fetching columns:', error)
		}
	}

	const tables = tableList.map((el, i) => {
		return (
			<option key={i} value={el}>
				{el}
			</option>
		)
	})

	return (
		<div className={styles.container}>
			{isTables && (
				<label>
					<h4 className={styles.header}>Выберите таблицу:</h4>
					<select onChange={handleChange} className={styles.select}>
						{tables}
					</select>
				</label>
			)}
			<ColumnSelection
				columnList={columnList}
				selectedOption={selectedOption}
				database={database}
			/>
		</div>
	)
}

export default TableSelection
