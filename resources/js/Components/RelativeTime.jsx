import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';

export default function RelativeTime({ date, className }) {
    const obj = dayjs(date);
    const span = useRef(null);

    useEffect(() => {
        const diff = dayjs().diff(obj, 'minute')
        const intervalGap = diff > 1 ? (diff < 60 ? 30000 : 1_800_000) : 500;

        const interval = setInterval(() => {
            if(span && span.current) {
                const diff = dayjs().diff(obj, 'second');
                if(diff < 60) {
                    span.current.innerText = `${diff} seconds ago`;
                } else {
                    span.current.innerText = obj.fromNow();
                }
            }
        }, intervalGap);
        return () => clearInterval(interval);
    });

    return (
        <span ref={span} data-time={date} className={className}>{obj.isToday() || obj.isFuture() ? (dayjs().diff(obj, 'second') < 60 ? `${dayjs().diff(obj, 'second')} seconds ago` : obj.fromNow()) : obj.format('MMM D, YYYY HH:mm')}</span>
    )
}
