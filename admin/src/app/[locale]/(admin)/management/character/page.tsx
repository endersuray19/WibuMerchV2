import ActionForm from "@/components/ActionForm/ActionForm"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/lib/axios"
import Image from "next/image"
import Link from "next/link"


export default async function Character() {
    const response = await api.get("/character/index")
    const character = response.data.character || []
    return (
        <div>
            <div className="rounded-sm border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default bg-white dark:border-white/5 dark:bg-white/3 sm:px-7.5 xl:pb-1">
                <Breadcrumb pageName='Character' />
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
                    <Link className='mx-4 mt-4 bg-blue-700 text-white px-2 py-2 inline-block rounded-md' href="/management/character/create">
                        Add Character
                    </Link>
                    <div className="max-w-full overflow-x-auto">
                        <Table>
                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/5">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Date
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        Action
                                    </TableCell>

                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                             {character.length === 0 ? (
                                    <tr>
                                        <td>
                                            <p className='block text-theme-sm  text-gray-800 dark:text-white px-5 py-5'>
                                                The data is empty
                                            </p>
                                        </td>
                                    </tr>)
                                   :(
                                    character.map((item:any)=>(
                                            <TableRow key={item._id}>
                                                <TableCell className="px-5 py-4 text-start sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 overflow-hidden rounded-full">
                                                            <Image
                                                                width={40}
                                                                height={40}
                                                                src={item.image}
                                                                alt={item.name}
                                                            />
                                                        </div>
                                                        <div>
                                                            <span className='block text-theme-sm  text-gray-800 dark:text-white'>
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                                    {item.date ? new Date(item.date).toLocaleDateString("id-ID") : "-"}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                                                    <ActionForm editUrl={`/management/character/edit/${item._id}`} endpoint='/Character' id={item._id} />
                                                </TableCell>
                                            </TableRow>
                                        )))}


                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

        </div>
    )

}