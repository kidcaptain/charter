import { useState } from "react"

const SelectForm = (props: { text: string, onChange: Function, name: string, array: any[] }) => {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [value, setValue] = useState<string | number>(props.text)
    return (
        <div>
            <div hidden={!isHidden} className={`uppercase w-full  ${value == "aucun" ? "bg-slate-50  min-w-9 h-8" : "bg-white" }`} onClick={() => setIsHidden(false)}>{value == "aucun" ? "   " : value }</div>
            <div hidden={isHidden}>
                <select id="" value={value} name={props.name} className="bg-gray-300  font-bold text-sm p-2" onChange={(e) => { props.onChange({ value: e.target.value, name: e.target.name, }); setValue(e.target.value) }} >
                    <option value=" " > </option>
                    {
                        props.array?.map((item: any, index: number) => (
                            <option value={`${item.nom} ${item.prenom}`} key={index}> {item.nom} {item.prenom}</option>
                        ))
                    }
                </select>
                <button className="text-xs font-bold" onClick={(e) => setIsHidden(true)}>Confirmer</button>
            </div>
        </div>
    )
}

export default SelectForm