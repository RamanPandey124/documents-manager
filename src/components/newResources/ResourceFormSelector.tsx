"use client"

import { useState } from "react"
import { MdAddToPhotos } from "react-icons/md"
import Modal from "../reuseable/Modal"
import ResourceFormModal from "./ResourceFormModal"
import { FaCloudUploadAlt } from "react-icons/fa";

export default function ResourceFormSelector() {
    const [isModal, setIsModal] = useState(false)
    const [type, setType] = useState<'create' | 'upload'>("create")

    const handleModal = () => {
        setIsModal(false)
    }

    const handleType = (type: 'create' | 'upload') => {
        setIsModal(true)
        setType(type)
    }

    return (
        <div className="h-12 flex justify-end items-center px-4">
            <div className="flex space-x-2">
                <div
                    onClick={() => handleType('upload')}
                    className="flex items-cente  bg-zinc-600 rounded-md hover:bg-zinc-500 cursor-pointer">
                    <FaCloudUploadAlt className=" mx-2 h-5 w-5" />
                    Upload
                </div>
                <div
                    onClick={() => handleType('create')}
                    className="flex items-center  bg-zinc-600 rounded-md  hover:bg-zinc-500 cursor-pointer">
                    <MdAddToPhotos className="mx-2 h-5 w-5" />
                    create
                </div>
            </div>

            <Modal isModal={isModal} handleModal={handleModal}>
                <ResourceFormModal handleModal={handleModal} FormType={type} />
            </Modal>

        </div>
    )
}