import dayjs from 'dayjs';

export default function RelativeTime({ date, className }) {
    const obj = dayjs(date);
    let display;
    if(obj.isToday() || obj.isFuture()) {
        display = obj.fromNow();
    } else {
        display = obj.format('MMM D, YYYY hh:mm');
    }
    return (
        <span className={className}>{dayjs(date).fromNow()}</span>
    )
}
