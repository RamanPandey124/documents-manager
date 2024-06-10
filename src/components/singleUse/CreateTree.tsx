"use client"
import FolderArchitect from "@/components/reuseable/FolderArchitect";
import Modal from "@/components/reuseable/Modal";
import { useState } from "react";
import { MdAddToPhotos } from "react-icons/md";

export default function CreateTree({ path }: { path: string }) {
    const [isModal, setIsModal] = useState(false)

    const handleModal = () => {
        setIsModal(false)
    }

    return (
        <div className="border-2 h-12 flex justify-end items-center px-4">
            <div
                onClick={() => setIsModal(true)}
                className=" flex rounded-md bg-blue-700 p-1 hover:bg-blue-200"
            >
                <MdAddToPhotos className="relative top-1 mx-2 h-5 w-5" />
                create
            </div>

            <Modal isModal={isModal} handleModal={handleModal}>
                <FolderArchitect path={path} handleModal={handleModal}/>
            </Modal>

        </div>
    )
}