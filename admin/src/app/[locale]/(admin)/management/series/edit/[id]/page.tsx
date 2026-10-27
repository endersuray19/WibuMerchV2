import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { api } from "@/lib/axios";
import FormSeries from "../../form/form";

interface pageProps {
    params: Promise<{ id: string }>
}

export default async function editSeries({params}:pageProps) {
    const resolveParams = await params;
    const seriesId = resolveParams.id;
    let dataseries = null;

    try{
        const series = await api.get('/series/detail-series',{data:{id:seriesId}})
        dataseries = series.data.series
    }
    catch(error:any){
        console.log(error)
    }
    return (
        <div>
            <Breadcrumb pageName="Edit Series"/>
            <FormSeries series={dataseries}/>
        </div>
    )
}