import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormSubCategory from "../form/form";
import { api } from "@/lib/axios";

export default async function AddSubCategory() {
    const response = await api.get("/category/index")
    const data = response.data.categories
    return(
        <div>
            <Breadcrumb pageName="Add Sub Category"/>
            <FormSubCategory  categoryTabel={data}/>
        </div>
    )
    
}