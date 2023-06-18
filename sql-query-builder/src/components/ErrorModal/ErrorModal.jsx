import styles from './ErrorModal.module.css'

// eslint-disable-next-line react/prop-types
const ErrorModal = ({ visible, setVisible }) => {
	const rootClasses = [styles.popup]
	if (visible) {
		rootClasses.push(styles.popupActive)
	}

	return (
		<div
			className={rootClasses.join(' ')}
			onClick={() => setVisible(false)}
			role='main'
		>
			<div className={styles.content} onClick={(e) => e.stopPropagation()}>
				<h2 className={styles.title}>
					Неверно введены данные, пожалуйста попробуйте снова!
				</h2>
				<div className={styles.closeWrapper} data-testid='close'>
					<div
						className={styles.close}
						onClick={() => setVisible(false)}
						role='button'
					></div>
				</div>
			</div>
		</div>
	)
}

export default ErrorModal
