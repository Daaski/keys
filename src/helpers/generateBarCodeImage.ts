import {createCanvas} from "canvas";
import JsBarcode from "jsbarcode";

export const generateITF14BarcodeImage = (itf14Code: string) => {
    // @ts-ignore
    const canvas = createCanvas();
    JsBarcode(canvas, itf14Code, {
        format: 'ITF', // Указываем формат штрихкода (ITF-14)
        lineColor: '#000000', // Цвет линий
        width: 2, // Ширина линий
        height: 100, // Высота штрихкода
        displayValue: false, // Отключаем отображение значения
    });

    // Возвращаем холст с изображением ITF-14 штрихкода
    return canvas;
};