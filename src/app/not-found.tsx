import Link from 'next/link'

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <div className='text-center mt-4'>
                <Link href="/main"><span className='bg-zinc-500 p-1 rounded-md'>Return Home</span></Link>
            </div>
        </div>
    )
}