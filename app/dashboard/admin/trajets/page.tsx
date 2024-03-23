"use client"
import TrajetAddForm from "@/components/trajet/trajetAddForm";
import TrajetTable from "@/components/trajet/trajetTable";
import Popup from "@/components/ui/popup";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Page() {
    const router = useRouter()
    const [popupData, setPopupData] = useState<{ message: string, title?: string, color: string }>({ message: "", title: "", color: "" })
    const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

    const handleOnEmitTable = (val: any) => {
        router.push("/dashboard/admin/trajets/" + val)
    }
    const handleChildren = (val: boolean) => {
        if (val) {
            configPopup("Trajet ajouté", "green", "")
        } else {
            configPopup("Veuillez reessayer", "red", "")
        }
    }
    const configPopup = (message: string, color: string, title: string) => {
        setPopupData({ message: message, color: color, title: title })
        setIsOpenPopup(true)
        setTimeout(() => {
            setIsOpenPopup(false)
        }, 5000);
    }

    return (
        <div className="p-10">
            <div className=" w-full min-h-screen">
                <div className=" py-4 flex justify-between items-start mb-2">
                    <h1 className="text-xl text-gray-900">Trajets</h1>
                </div>
                <div>
                    <section className="grid grid-cols-4 w-full h-full gap-4">
                        <div className="col-span-1">
                            <TrajetAddForm childToParent={handleChildren} />
                        </div>
                        <div className="col-span-3">
                            <TrajetTable childToParent={handleOnEmitTable} />
                        </div>
                    </section>
                </div>
            </div>
            {isOpenPopup ? (<Popup color={popupData?.color} title={popupData.title} message={popupData?.message} onShow={() => setIsOpenPopup(false)} />) : null}
        </div>
    )
}