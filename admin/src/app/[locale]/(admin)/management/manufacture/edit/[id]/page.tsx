import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { api } from "@/lib/axios";
import FormManufacture from "../../form/form";

interface pageProps{
    params: Promise<{id:string}>
}

export default async function  editManufacture({params}:pageProps){
    const resolveParams = await params;
    const manfuactureId = resolveParams.id;
    let manufactureData = null;
    try{
        const manufacture = await api.get('/manufacture/detail-manufacture',{data:{id:manfuactureId}})
        manufactureData = manufacture.data.manufacture
    }
    catch(error:any){

    }
    return (
        <div>
            <Breadcrumb pageName="Edit Manufacture"/>
            <FormManufacture manufacture={manufactureData}/>
        </div>
    )
}