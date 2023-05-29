import { useState } from 'react'
import DatabaseConnection from './components/DatabaseConnection'
import TableSelection from './components/TableSelection'

const App = () => {
	const [tableList, setTableList] = useState([])

	return (
		<div>
			<DatabaseConnection setTableList={setTableList} />
			<TableSelection tableList={tableList} />
		</div>
	)
}

export default App
