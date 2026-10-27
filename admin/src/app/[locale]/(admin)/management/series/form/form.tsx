"use client"
import Form from '@/components/form/Form';
import useForm from '@/hooks/useForm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface series {
    series?: {
        _id: string;
        name: string;
        description: string;
        image?: string;
    }
}

export default function FormSeries({ series }: series) {
    const router = useRouter()
    const { handleSubmit, handleFileChange, imagePreview, loading } = useForm({
        tabel: series?._id || "",
        idData: series?._id || "",
        endpointAdd: "/series/add",
        endpointEdit: "/series/edit",
        path: "/management/series",
        titleTable: "Series",
        dataImage: series?.image
    })

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:border-white/5">
                <div className="rounded-sm border border-stroke dark:border-white/5  shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark dark:border-white/5">
                        <h3 className="font-medium text-black dark:text-white">
                            {series ? "Edit Series" : "Form Series"}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5 dark:border-white/5">
                            <div className="mb-4.5 dark:border-white/5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Name Series
                                </label>
                                <input
                                    disabled={loading}
                                    name="name"
                                    defaultValue={series?.name || ""}
                                    type="text"
                                    placeholder="Enter Series Name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Description
                                </label>
                                <textarea
                                    disabled={loading}
                                    defaultValue={series?.description || ""}
                                    name="description"
                                    rows={6}
                                    placeholder="Type Series description"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                ></textarea>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Attach file (Image)
                                </label>
                                <input
                                    type="file"
                                    name="image" // Sesuai dengan req.file di backend multer
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex mt-5 w-full justify-center rounded bg-primary p-3 bg-blue-600  font-medium text-white hover:bg-opacity-90 disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? "PROCESSING..." : "SUBMIT"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col items-center justify-center">
                    {imagePreview ? (
                        <div className="relative w-64 h-64 rounded bg-white shadow-md overflow-hidden border">
                            <Image
                                src={imagePreview}
                                alt="preview"
                                fill
                                className="object-cover"
                            />
                            {/* <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute right-2 top-2 z-10 rounded-full bg-red-600 p-1.5 text-white transition-opacity hover:bg-red-700 cursor-pointer"
                                  >
                                    <X size={16} />
                                  </button> */}
                        </div>
                    ) : (

                        <span className="w-64 h-64 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
                            No Image Preview
                        </span>

                    )}
                </div>

            </div>


        </div>
    )
}
