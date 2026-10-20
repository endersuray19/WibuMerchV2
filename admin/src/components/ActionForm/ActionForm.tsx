"use client"

import Swal from "sweetalert2"
import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import Link from "next/link";

interface ActionFormProps {
    id: string;
    endpoint: string;
    editUrl: string;
}
export default function ActionForm({ id, endpoint, editUrl }: ActionFormProps) {
    

    const handleDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            title: "Are you sure?",
            text: "You want delete this item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d5",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        if (isConfirmed) {
            try {
                // Request DELETE universal menggunakan axios helper
                await api.post(`${endpoint}/remove`,{id:id});

                await Swal.fire({
                    title: "Deleted!",
                    text: "Item has been deleted successfully.",
                    icon: "success",
                });
                window.location.reload()

            } catch (error: any) {
                await Swal.fire({
                    title: "Error!",
                    text: error.response?.data?.message || "Gagal menghapus data",
                    icon: "error",
                });
            }
        }
    };
    return(
        <div className="flex items-center space-x-3.5">
            <Link className="text-sm text-blue-500 hover:underline" href={editUrl}>Edit</Link>
            <span className="text-gray-300">|</span>
            <button
                type="button"
                onClick={handleDelete}
                className="text-sm text-red-500 hover:underline cursor-pointer"
            >
                Delete
            </button>
        </div>
    )
}

