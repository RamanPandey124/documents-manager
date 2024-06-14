"use client"
import { CounterContext } from "@/context/CounterContext";
import Link from "next/link";
import { use, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function PathNavigator() {
    const { state } = use(CounterContext)
    const { path } = state

    return (
        <>
            <h1 className="px-4 text-3xl"><Link href={'/tree/main'}>My Files</Link></h1>
            <div className="mx-4 flex space-x-4">
                {path.length > 1 &&
                    <div>
                        <Link href={`/tree/main/${path[path.length - 2]._id}`}><FaArrowLeft /></Link>
                    </div>
                }

                <div>
                    {path?.map((item, index) => {
                        return (
                            <span key={item._id}>
                                {index > 0 &&
                                    <MdOutlineNavigateNext className="inline" />}
                                <Link href={`/tree/main/${item._id}`}>{item.name}</Link>
                            </span>
                        )
                    })}
                </div>
            </div>
        </>
    )
}