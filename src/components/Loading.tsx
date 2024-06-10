
export default function Loading({ isText = false, isSpin = true }: { isText?: boolean, isSpin?: boolean }) {
    return (
        <div className="flex items-center justify-center border-2 h-full w-full bg-zinc-800">
            {isSpin && <div className={`animate-spin rounded-full border-2 border-b-0 border-blue-500 h-12 w-12`} />}
            {isText && <div>loading...</div>}
        </div>
    )
}