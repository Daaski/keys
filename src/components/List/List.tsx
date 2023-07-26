import {FC, forwardRef} from "react";

import {IData} from "pages";
import {ListItem} from "components/List/ListItem";
import {Button} from "primereact/button";

import scss from './List.module.scss'



interface ListProps {
    data?: IData[]
    handleDelete: (id: number) => void
    handleDeleteAll: () => void
}

// eslint-disable-next-line react/display-name
export const List: FC<ListProps> = forwardRef(({data, handleDelete, handleDeleteAll}, ref) => {

    const saveAsPDF = () => {
        // @ts-ignore
        import('html2pdf.js').then((html2pdf) => {
            html2pdf.default().from(document.getElementById('forPdf')).save()
        });
    };

    if (!data) {
        return null
    }
    return (
        <div className={scss.list}>
            <div className={scss.list_header}>
                <h2>Результат</h2>
                <div className={scss.list_menu}>
                    <Button onClick={() => handleDeleteAll()} severity="danger" outlined>Удалить всё</Button>
                    <Button onClick={() => saveAsPDF()}>Скачать наклейки ШК</Button>
                </div>
            </div>
            <div id='forPdf' style={{width: "100%"}}>
                {data?.map((d, index) =>
                    <ListItem key={index} {...d} handleDelete={handleDelete}/>
                )}
            </div>
        </div>
    )
})