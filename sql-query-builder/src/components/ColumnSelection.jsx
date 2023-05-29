/* eslint-disable react/prop-types */
const ColumnSelection = ({ columnList }) => {
	return (
		<div>
			{columnList.map((el, i) => (
				<div key={i}>{el}</div>
			))}
		</div>
	)
}

export default ColumnSelection
