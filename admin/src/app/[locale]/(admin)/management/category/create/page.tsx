import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Form from "../form/form";



export default function createCategory(){
    return(
        <div>
            <Breadcrumb pageName="Create Category"/>
            <Form/>
        </div>
    )
}