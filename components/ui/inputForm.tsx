import { useState } from "react"

const InputForm = (props: {text: string, onChange: Function, name: string, type: string}) => {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [value, setValue] = useState<string | number>(props.text)
    return(
        <div>
            <div hidden={!isHidden} onClick={() => setIsHidden(false)}>{value}</div>
            <div hidden={isHidden}>
            <input type={props.type} value={value} name={props.name} className="bg-gray-300 font-bold text-sm p-2" onChange={(e) =>{ props.onChange({value: e.target.value, name: e.target.name, });  setValue(e.target.value)}} />
                <button className="text-xs font-bold" onClick={(e) => setIsHidden(true) }>Confirmer</button>
            </div>
        </div>
    )
}

export default InputForm