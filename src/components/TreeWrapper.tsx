import { fileSystemDocument } from "@/lib/types/tree";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

export default function TreeWrapper({ children, file }: { children: React.ReactNode, file: fileSystemDocument }) {
    return (
        <div>
            {file.contentType === "directory" && <IoIosArrowForward />}
            {children}
        </div>
    )
}