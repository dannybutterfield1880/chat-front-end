import moment from 'moment'

export const formatDateString = (dateString) => {
    const date = new moment(dateString);

    return date.fromNow()
}