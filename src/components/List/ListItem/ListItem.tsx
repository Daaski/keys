import {IData} from "@/pages";
import DeleteSvg from './svg/plus-svgrepo-com.svg'
import {generateITF14BarcodeImage} from "@/helpers/generateBarCodeImage";

import scss from './List.module.scss'
import Image from "next/image";


interface ListItemProps extends IData {
    handleDelete: (id: number) => void
}

export const ListItem = ({id, code, category, handleDelete}: ListItemProps) => {
    const barcodeImageCanvas = generateITF14BarcodeImage(code);
    const barcodeDataURL = barcodeImageCanvas.toDataURL();
    return (
        <div className={scss.list_item}>
            <div className={scss.list_item_description}>
                <span className={scss.list_item_field}>{id}</span>
                <p className={scss.list_item_field}>{category}</p>
            </div>
            <div className={scss.barcode}>
                <Image src={barcodeDataURL} alt='Изображение кода' width={330} height={150}/>
                <p>{code}</p>
            </div>
            <DeleteSvg onClick={() => handleDelete(id)} className={scss.delete_svg}/>
        </div>
    )
}