/* eslint-disable react/prop-types */
const Button = ({ className, type, text, onClick }) => {
	return (
		<button className={className} type={type} onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
