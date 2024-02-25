

export default function CardTicket(props: {
    trajet: string,
    agence: string,
    horaire: string,
    passagers: number,
    date: string,
    validite: boolean,
    confimation: boolean,
    id: number
}) {
    return (
            <div className="border bg-white border-stone-500 ">
                <div className="flex flex-row border-b border-stone-400 p-2 items-center justify-between">
                    <div>
                       <p> <span className="font-bold ">{props.trajet}</span> <br /> <span className="text-xs">{props.agence}</span> </p>
                    </div>
                    <div>
                        <h2 className="text-xs font-bold">{props.confimation ? (<span className="text-green-500">Confirmée</span>) : ""}</h2>
                    </div>
                </div>
                <div className="flex flex-row  p-2 items-center justify-between">
                    <div>
                       <p> <span className="font-bold ">{props.horaire}</span> <br /> <span className="text-xs">Heure</span> </p>
                    </div>
                    <div>
                    <p> <span className="font-bold ">{props.date}</span> <br /> <span className="text-xs">Date</span> </p>
                    </div>
                </div>
                <div className="flex flex-row p-2 items-center justify-between">
                    <div>
                       <p> <span className="font-bold ">{props.passagers}</span> <br /> <span className="text-xs">Nombre de sièges prises</span> </p>
                    </div>
                    <div>
                    <p >  {!props.validite ? (<span className="text-red-500 font-bold">Ticket Expiré</span>) : ""} <br /> <span className="text-xs first-letter:uppercase">état du ticket</span></p>
                    </div>
                </div>
            </div>
    )
}