import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { api } from "@/lib/axios";
import FormSubCategory from "../../form/form";

interface pageProps {
    params: Promise<{ id: string }>
}
export default async function ({ params }: pageProps) {
    const resolveparams = await params;
    const subCategoryId = resolveparams.id;
    let subCategoryData = null
    

    try {
        const response = await api("/subcategory/detail-subcategory",{data:{id:subCategoryId}})
        subCategoryData = response.data.subCategory
        console.log(subCategoryData)
    } catch (error: any) {
        console.log(error)
    }
    const responseCategory = await api.get("/category/index");
    const dataCategory = responseCategory.data.categories
    return(
        <div>
            <Breadcrumb pageName="Edit Sub Category"/>
            <FormSubCategory categoryTabel={dataCategory} subcategory={subCategoryData}/>
        </div>
    )
}