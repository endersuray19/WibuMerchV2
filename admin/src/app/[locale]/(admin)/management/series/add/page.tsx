import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import React from 'react'
import FormSeries from '../form/form'


export default  function addSeries(){
    return(
        <div>
            <Breadcrumb pageName='Add Series' />
            <FormSeries/>
        </div>
    )
}
