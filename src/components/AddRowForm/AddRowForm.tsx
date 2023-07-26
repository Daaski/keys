import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useFormik} from "formik";
import {Dispatch, SetStateAction} from "react";

import {IData} from "@/pages";
import {FormValues} from "@/components/AddRowForm/types";
import {AddRowFormValidate} from "@/components/AddRowForm/AddRowForm.utils";
import {generateRandomITF14Code} from "@/helpers/generateITF-14Code";

import scss from './AddRowForm.module.scss'




interface AddRowFormProps {
    setData: Dispatch<SetStateAction<IData[] | undefined>>
}

export const AddRowForm = ({setData}: AddRowFormProps) => {

    const onSubmit = (values: FormValues) => {
        let arr: IData[] = []
        for (let i = 1; i <= +values.count; i++) {
            arr.push({id: i, code: generateRandomITF14Code(), category: values.room})
        }
        setData( data => [...data ?? [], ...arr])
        localStorage.setItem('data', JSON.stringify(arr))
    }

    const {values, handleChange, handleSubmit, handleBlur, isValid, errors, touched} = useFormik<FormValues>({
        initialValues: {
            room: '',
            count: ''
        },
        validateOnMount: true,
        validate: AddRowFormValidate,
        onSubmit
    })

    return (
        <form onSubmit={handleSubmit} className={scss.form}>
            <div className={scss.fields}>
                <div>
                 <span className="p-float-label">

                    <InputText onBlur={handleBlur} className={touched.room ? errors.room && 'p-invalid' : ''} style={{width: "100%"}} id='room'
                               value={values.room} onChange={handleChange}/>
                     <label htmlFor="input_value">Наименование помещения</label>
                 </span>
                    <small style={{color: 'red'}} id="room">
                        {touched.room && errors.room}
                    </small>
                </div>
                <div>
                <span className="p-float-label">
                    <InputText keyfilter='int' onBlur={handleBlur} className={touched.count ? errors.count && 'p-invalid' : ''} style={{width: "100%"}} id='count'
                               value={values.count + ''} onChange={handleChange}/>
                    <label htmlFor="input_value">Количество</label>
                </span>
                    <small style={{color: 'red'}} id="count">
                        {touched.count && errors.count}
                    </small>
                </div>
            </div>
            <Button disabled={!isValid} type='submit' label='Сгенерировать' className={scss.button}/>
        </form>
    )
}