"use client"

import useForm from "@/hooks/useForm";
import { api } from "@/lib/axios";
import Image from "next/image";

interface CharacterProps {
    character?: {
        _id: string;
        name: string;
        description: string;
        series?: string;
        image?: string;
    },
    seriesTabel:any[]
}
export default function FormCharacter({ character,seriesTabel }: CharacterProps) {
    const { handleSubmit, handleFileChange, imagePreview, loading } = useForm({
        tabel: character?._id || "",
        endpointEdit: "/character/edit",
        endpointAdd: "/character/add",
        dataImage: character?.image || "",
        path: "/management/character",
        titleTable: "Character",
        idData: character?._id || "",
    })
    
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:border-white/5">
                <div className="rounded-sm border border-stroke dark:border-white/5  shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark dark:border-white/5">
                        <h3 className="font-medium text-black dark:text-white">
                            {character ? "Edit Character" : "Add Character"}
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5 dark:border-white/5">
                            <div className="mb-4.5 dark:border-white/5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Name Character
                                </label>
                                <input
                                    disabled={loading}
                                    name="name"
                                    defaultValue={character?.name || ""}
                                    type="text"
                                    placeholder="Enter Character Name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>
                            <div className="mb-4.5 dark:border-white/5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Description Character
                                </label>
                                <textarea
                                    disabled={loading}
                                    name="description"
                                    defaultValue={character?.description || ""}
                                    placeholder="Enter Character description"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    required
                                />
                            </div>
                            <div className="mb-4.5 dark:border-white/5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Series
                                </label>
                                <select name="series" defaultValue={character?.series||""} className="block w-full  px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body dark:text-white">
                                    <option className=" text-black">Choose a series</option>
                                    {seriesTabel.map((item:any) => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))}


                                </select>
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