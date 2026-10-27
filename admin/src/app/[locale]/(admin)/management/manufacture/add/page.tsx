import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormManufacture from "../form/form";

export default function addManufacture(){
    return(
        <div>
            <Breadcrumb pageName="Add Manufacture"/>
            <FormManufacture />
        </div>
    )
}