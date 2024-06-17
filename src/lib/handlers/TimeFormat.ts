export function convert(date: string, full: boolean = false) {
    let strDate = new Date(date)
    if (full) { return `${strDate.toLocaleString().split(",")[1]}, ${strDate.toDateString()}` }
    return strDate.toLocaleDateString()
}