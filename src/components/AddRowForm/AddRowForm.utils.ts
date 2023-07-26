import {FormValues} from "components/AddRowForm/types";


export const AddRowFormValidate = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (!values.count) {
        errors.count = 'Введите количество'
    }
    if (!values.room) {
        errors.room = 'Укажите наименование'
    }

    return errors
}