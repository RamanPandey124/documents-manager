
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiDownload } from "react-icons/fi"

export function DownloadButton({ filePath }: { filePath: string | undefined }) {
    const linkRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const handleDownload = async () => {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/api/download?path=${filePath}`);
        const blob = await response.blob();
        if (!response.ok) {
            toast.error(response.statusText)
        }
        else {
            const url = window.URL.createObjectURL(blob);
            const link = linkRef.current as HTMLAnchorElement | null

            if (!link) {
                return
            }

            const filename = response.headers.get('Content-Disposition')?.split('filename=')[1]?.trim()
            console.log(filename)
            link.href = url;
            link.download = filename || 'download.txt';
            link.click();
            window.URL.revokeObjectURL(url);
        }
        setLoading(false)
    }

    return (
        <>
            <a ref={linkRef} style={{ display: "none" }}></a>
            {loading ?
                <div className="flex items-center justify-center h-full w-full">
                    <div className={`animate-spin rounded-full border-2 border-b-0 border-blue-300 h-4 w-4`} />
                </div> :
                <div
                    onClick={handleDownload} className="flex items-center space-x-4 hover:bg-zinc-700 py-1 rounded-md cursor-pointer">
                    <FiDownload className="h-5 w-5" />
                    <p>Download</p>
                </div>
            }
        </>
    )
}