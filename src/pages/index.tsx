import {useEffect, useState} from "react";

import {List} from "@/components/List";
import {AddRowForm} from "@/components/AddRowForm/AddRowForm";

import scss from '@/styles/Home.module.scss'

export interface IData {
    id: number,
    category: string,
    code: string
}

export default function Home() {
    const [data, setData] = useState<IData[]>()

    const handleDeleteCode = (id: number) => {
        setData(data?.filter(d => d.id !== id))
    }

    const handleDeleteAll = () => {
        setData(undefined)
        localStorage.removeItem('data')
    }

    useEffect(() => {
        const data = localStorage.getItem('data')
        if (data) {
            setData(JSON.parse(data))
        }
    }, [])

    return (
        <div className={scss.main}>
            <AddRowForm setData={setData}/>
            <List data={data} handleDeleteAll={handleDeleteAll} handleDelete={handleDeleteCode}/>
        </div>
    )
}
