export const formatThaiDateTime = (isoDate: string): string => {
    const date = new Date(isoDate);

    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok",
    }).format(date).replace(',', ' |');
};