import { useState, useEffect } from 'react'
import { QueryBuilder, formatQuery } from 'react-querybuilder'
import 'react-querybuilder/dist/query-builder.css'
import translations from '../../models/translations'
import combinators from '../../models/combinators'
import styles from './ColumnSelection.module.css'

/* eslint-disable react/prop-types */
const ColumnSelection = ({
	columnList,
	selectedOption = { selectedOption },
}) => {
	const [fields, setFields] = useState([
		{ name: 'firstName', label: 'First Name' },
		{ name: 'lastName', label: 'Last Name' },
	])
	const [initialQuery, setInitialQuery] = useState({
		combinator: 'and',
		rules: [],
	})
	const [query, setQuery] = useState(initialQuery)

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
		if (fields) {
			setInitialQuery({
				combinator: 'and',
				rules: fields.map((fieldName) => ({
					field: fieldName,
					operator: '=',
					value: '',
				})),
			})
		}
	}, [fields])

	useEffect(() => {
		if (initialQuery) {
			setQuery(initialQuery)
		}
	}, [initialQuery])

	// return (
	// 	<div>
	// 		hello
	// 		{/* {fields.map((el, i) => (
	// 			<div key={i}>{el}</div>
	// 		))} */}
	// 	</div>
	// )
	return (
		<div>
			{columnList && fields && initialQuery && query ? (
				<div>
					<QueryBuilder
						fields={fields}
						query={query}
						onQueryChange={(q) => setQuery(q)}
						translations={translations['rus']}
						combinators={combinators['rus']}
					/>
					<h4 className={styles.header}>Созданный запрос</h4>
					<pre className={styles.query}>
						<code>
							SELECT * FROM {selectedOption} WHERE {formatQuery(query, 'sql')}
						</code>
					</pre>
				</div>
			) : (
				<div>Что-то пошло не так, пожалуйста попробуйте позже</div>
			)}
		</div>
	)
}

export default ColumnSelection
