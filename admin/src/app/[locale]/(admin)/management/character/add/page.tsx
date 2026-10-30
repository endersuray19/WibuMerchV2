import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormCharacter from "../form/form";
import { api } from "@/lib/axios";

export default async function AddCharacter(){
    const serie = await api.get("series/index");
    const series = serie.data.series
    return(
        <div>
            <Breadcrumb pageName="Add Character"/>
            <FormCharacter seriesTabel={series}/>
        </div>
    )
}