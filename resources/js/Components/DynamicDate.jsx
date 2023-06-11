import {useEffect, useState} from "react";

export default function DynamicDate({ date }) {

    const [display, setDisplay] = useState(dayjs(date).fromNow())

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplay(dayjs(date).fromNow())
        }, 750)
        return () => clearInterval(interval)
    });

    return <>{display}</>;
}
