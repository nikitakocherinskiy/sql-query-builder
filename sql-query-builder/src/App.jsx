import { useState } from 'react'
import DatabaseConnection from './components/DatabaseConnection/DatabaseConnection'
import TableSelection from './components/TableSelection/TableSelection'
import styles from './styles/App.module.css'

const App = () => {
	const [tableList, setTableList] = useState([])

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Создание SQL запроса</h1>
			<DatabaseConnection setTableList={setTableList} />
			<TableSelection tableList={tableList} />
		</div>
	)
}

export default App
