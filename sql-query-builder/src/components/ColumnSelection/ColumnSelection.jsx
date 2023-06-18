import { useState, useEffect, useRef } from 'react'
import { QueryBuilder, formatQuery } from 'react-querybuilder'
import 'react-querybuilder/dist/query-builder.css'
import translations from '../../models/translations'
import combinators from '../../models/combinators'
import styles from './ColumnSelection.module.css'
import Button from '../Button/Button'
import DatabaseComponent from '../DatabaseComponent/DatabaseComponent'

/* eslint-disable react/prop-types */
const ColumnSelection = ({
	columnList,
	selectedOption = { selectedOption },
	database,
}) => {
	const [fields, setFields] = useState([
		{ name: 'firstName', label: 'First Name' },
		{ name: 'lastName', label: 'Last Name' },
	])
	// eslint-disable-next-line no-unused-vars
	const [initialQuery, setInitialQuery] = useState({
		combinator: 'and',
		rules: [],
	})
	const [query, setQuery] = useState(initialQuery)
	const [queryToExecute, setQueryToExecute] = useState('')
	const queryRef = useRef(null)

	useEffect(() => {
		if (columnList) {
			setFields(
				columnList.map((fieldName) => ({
					name: fieldName,
					label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
				}))
			)
		}
	}, [columnList])

	useEffect(() => {
		if (initialQuery) {
			setQuery(initialQuery)
		}
	}, [initialQuery])

	useEffect(() => {
		setInitialQuery({
			combinator: 'and',
			rules: [],
		})
	}, [selectedOption])

	const copyText = () => {
		const textToCopy = queryRef.current.textContent
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				alert('Текст скопирован!')
			})
			.catch((error) => {
				console.error('Ошибка при копировании текста:', error)
			})
	}

	const handleClick = () => {
		setQueryToExecute(queryRef.current.textContent)
	}

	return (
		<div>
			{columnList && fields && initialQuery && query ? (
				<div className={styles.container}>
					<QueryBuilder
						fields={fields}
						query={query}
						onQueryChange={(q) => setQuery(q)}
						translations={translations['rus']}
						combinators={combinators['rus']}
					/>
					<h4 className={styles.header}>Созданный запрос</h4>
					<pre className={styles.query}>
						<code ref={queryRef}>
							SELECT * FROM {selectedOption} WHERE {formatQuery(query, 'sql')}
						</code>
						<Button
							text='Выполнить запрос'
							onClick={handleClick}
							className={styles.execute}
						/>
						<Button text='Копировать' onClick={copyText} />
					</pre>
					<DatabaseComponent query={queryToExecute} database={database} />
				</div>
			) : (
				<div>Что-то пошло не так, пожалуйста попробуйте позже</div>
			)}
		</div>
	)
}

export default ColumnSelection
