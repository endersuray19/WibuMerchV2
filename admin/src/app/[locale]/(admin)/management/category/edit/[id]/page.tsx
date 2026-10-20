
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Form from "../../form/form";
import { api } from "@/lib/axios";

interface pageProps {
    params: Promise<{ id: string }>;
}


export default async function updateCategory({ params }: pageProps) {
    const resolveParams = await params;
    const categoryId = resolveParams.id;
    let dataCategory = null
    try {
        const category = await api.get('/category/detail-category', {data:{idCategory:categoryId}});
        dataCategory = category.data.category
        console.log("test :",dataCategory)
    } catch (error: any) {
        console.log(error)
    }

    return (
        <div>
            <Breadcrumb pageName="Update Category" />
            <Form category={dataCategory} />
        </div>
    )
}