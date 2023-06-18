import { useState } from 'react'
import DatabaseConnection from './components/DatabaseConnection/DatabaseConnection'
import TableSelection from './components/TableSelection/TableSelection'
import styles from './styles/App.module.css'

const App = () => {
	const [tableList, setTableList] = useState([])
	const [database, setDatabase] = useState('')

	const handleChildValueChange = (childValue) => {
		setDatabase(childValue)
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Создание SQL запроса</h1>
			<DatabaseConnection
				setTableList={setTableList}
				onValueChange={handleChildValueChange}
			/>
			<TableSelection tableList={tableList} database={database} />
		</div>
	)
}

export default App
