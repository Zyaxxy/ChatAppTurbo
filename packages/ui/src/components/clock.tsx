"use client";

import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat("en-US", {
                timeZone: "Asia/Hong_Kong",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }).format(now);
            setTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return <span className="text-neutral-500 ml-2 font-light">...</span>;

    return <span className="text-neutral-500 ml-2 font-light">{time} HKT</span>;
}