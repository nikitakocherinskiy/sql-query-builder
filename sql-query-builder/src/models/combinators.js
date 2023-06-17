import { defaultCombinators } from 'react-querybuilder'

const combinators = {
	en: defaultCombinators,
	rus: [
		{ name: 'and', label: 'И' },
		{ name: 'or', label: 'ИЛИ' },
	],
}

export default combinators
