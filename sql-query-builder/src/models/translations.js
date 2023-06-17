import { defaultTranslations } from 'react-querybuilder'

const translations = {
	en: defaultTranslations,
	rus: {
		fields: {
			title: 'Поля',
		},
		operators: {
			title: 'Операторы',
		},
		value: {
			title: 'Значение',
		},
		removeRule: {
			label: 'Удалить',
			title: 'Удалить правило',
		},
		removeGroup: {
			label: 'Удалить',
			title: 'Удалить группу',
		},
		addRule: {
			label: '+Правило',
			title: 'Добавить правило',
		},
		addGroup: {
			label: '+Группа',
			title: 'Добавить группу',
		},
		combinators: {
			title: 'Комбинаторы',
		},
		notToggle: {
			title: 'Инвертировать эту группу',
		},
	},
}

export default translations
