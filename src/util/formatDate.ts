import type { Moment } from 'moment'
import moment from 'moment'

export default function formatDate(date: string | Moment) {
	const year = moment(date).format('YYYY')
	const month = moment(date).format('MM')
	const day = moment(date).format('DD')
	return `${year}-${month}-${day}`
}
