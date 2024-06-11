"use client"

import { useState } from "react"
import { MdAddToPhotos } from "react-icons/md"
import Modal from "../reuseable/Modal"
import ResourceFormModal from "./ResourceFormModal"

export default function CreateNewResource() {
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
                <ResourceFormModal handleModal={handleModal} />
            </Modal>

        </div>
    )
}