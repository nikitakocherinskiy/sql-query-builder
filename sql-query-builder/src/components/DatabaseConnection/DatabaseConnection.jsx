import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './DatabaseConnection.module.css'
import Button from '../Button/Button'
import ErrorModal from '../ErrorModal/ErrorModal'

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
	const [isVisibleModal, setIsVisibleModal] = useState(false)

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
				setIsVisibleModal(true)
				console.error('Error fetching columns:', error)
			}
		}
		fetchDatabase()
	}

	return (
		<div className={styles.container}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				name='DatabaseConnection'
				className={styles.form}
			>
				<label>
					<h4>СУБД:</h4>
					<select
						{...register('database', {
							required: 'Это обязательное поле',
						})}
					>
						<option value=''>Выберите СУБД</option>
						<option value='postgresql'>PostgreSQL</option>
						<option value='mysql'>MySQL</option>
					</select>
					{errors?.database && (
						<p className={styles.error}>
							{errors?.database?.message || 'Error!'}
						</p>
					)}
				</label>
				<label>
					<h4>Хост:</h4>
					<input
						{...register('host', {
							required: 'Это обязательное поле',
						})}
					/>
					{errors?.host && (
						<p className={styles.error}>{errors?.host?.message || 'Error!'}</p>
					)}
				</label>
				<label>
					<h4>Порт:</h4>
					<input
						{...register('port', {
							required: 'Это обязательное поле',
						})}
					/>
					{errors?.port && (
						<p className={styles.error}>{errors?.port?.message || 'Error!'}</p>
					)}
				</label>

				<label>
					<h4>Имя базы данных:</h4>
					<input
						{...register('databaseName', {
							required: 'Это обязательное поле',
						})}
					/>
					{errors?.databaseName && (
						<p className={styles.error}>
							{errors?.databaseName?.message || 'Error!'}
						</p>
					)}
				</label>
				<label>
					<h4>Имя пользователя СУБД:</h4>
					<input
						{...register('user', {
							required: 'Это обязательное поле',
						})}
					/>
					{errors?.user && (
						<p className={styles.error}>{errors?.user?.message || 'Error!'}</p>
					)}
				</label>
				<label>
					<h4>Пароль:</h4>
					<input
						type='password'
						{...register('password', {
							required: 'Это обязательное поле',
						})}
					/>
					{errors?.password && (
						<p className={styles.error}>
							{errors?.password?.message || 'Error!'}
						</p>
					)}
				</label>

				{/* <button type='submit' className={styles.button}>
					Подключиться
				</button> */}
				<Button className={styles.button} type='submit' text='Подключиться' />
			</form>
			{isShowMassage && <p>Данные приняты, ожидайте</p>}
			<ErrorModal visible={isVisibleModal} setVisible={setIsVisibleModal} />
		</div>
	)
}

export default DatabaseConnection
