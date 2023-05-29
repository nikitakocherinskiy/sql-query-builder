import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const DatabaseConnection = ({ setTableList }) => {
	const {
		register,
		formState,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({ mode: 'onBlur' })
	const [isShowMassage, setIsShowMassage] = useState(false)

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset()
		}
	}, [formState, reset])

	useEffect(() => {
		const messageTimeout = setTimeout(() => {
			if (isShowMassage) {
				setIsShowMassage(false)
			}
			reset()
		}, 2000)

		return () => {
			clearInterval(messageTimeout)
		}
	}, [isShowMassage, reset])

	const onSubmit = (data) => {
		const fetchDatabase = async () => {
			try {
				const response = await axios.post(
					'http://localhost:5000/execute-query',
					{
						dbData: data,
						databaseType: data.database,
						query: `SELECT table_name FROM information_schema.tables  where table_schema='public' ORDER BY table_name;`,
					}
				)
				setTableList(response.data.rows.map((col) => col.table_name))
			} catch (error) {
				console.error('Error fetching columns:', error)
			}
		}
		fetchDatabase()
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} name='DatabaseConnection'>
				<label>
					<h4>СУБД:</h4>
					<select
						{...register('database', {
							required: 'This field is required',
						})}
					>
						<option value=''>Выберите СУБД</option>
						<option value='postgresql'>PostgreSQL</option>
						<option value='mysql'>MySQL</option>
						<option value='sqlite'>SQLite</option>
					</select>
					{errors?.database && <p>{errors?.database?.message || 'Error!'}</p>}
				</label>
				<label>
					<h4>Хост:</h4>
					<input
						{...register('host', {
							required: 'This field is required',
						})}
					/>
					{errors?.host && <p>{errors?.host?.message || 'Error!'}</p>}
				</label>
				<label>
					<h4>Порт:</h4>
					<input
						{...register('port', {
							required: 'This field is required',
						})}
					/>
					{errors?.port && <p>{errors?.port?.message || 'Error!'}</p>}
				</label>

				<label>
					<h4>Имя базы данных:</h4>
					<input
						{...register('databaseName', {
							required: 'This field is required',
						})}
					/>
					{errors?.databaseName && (
						<p>{errors?.databaseName?.message || 'Error!'}</p>
					)}
				</label>
				<label>
					<h4>Имя пользователя СУБД:</h4>
					<input
						{...register('user', {
							required: 'This field is required',
						})}
					/>
					{errors?.user && <p>{errors?.user?.message || 'Error!'}</p>}
				</label>
				<label>
					<h4>Пароль:</h4>
					<input
						type='password'
						{...register('password', {
							required: 'This field is required',
						})}
					/>
					{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
				</label>

				<button type='submit'>Submit</button>
			</form>
			{isShowMassage && <p>Thank you for submitting the form!</p>}
		</div>
	)
}

export default DatabaseConnection
