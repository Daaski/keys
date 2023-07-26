// @ts-ignore
import html2pdf from 'html2pdf.js';

import {IData} from "@/pages";
import {ListItem} from "@/components/List/ListItem";
import {Button} from "primereact/button";

import scss from './List.module.scss'


interface ListProps {
    data?: IData[]
    handleDelete: (id: number) => void
    handleDeleteAll: () => void
}

export const List = ({data, handleDelete, handleDeleteAll}: ListProps) => {

    const saveAsPDF = () => {
        const element = document.getElementById('forPdf');
        if (!element) {
            console.error('Элемент с ID "forPdf" не найден.');
            return;
        }

        html2pdf()
            .from(element)
            .save('example.pdf');
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
}