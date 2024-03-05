import { useEffect, useState } from 'react';

const PassagerTable = (props: { childToParent: Function, setData: Function, agenceId: number | null }) => {

    const [passagers, setPassagers] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await fetch("/api/passagers", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Failed")
            }
            const data = await res.json();
            setPassagers(data)
        }
        getData();
    }, [])
    const getDate = (str: string) => {
        const date = new Date(str);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
        const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        return `${year}-${month}-${day}`
    }


    return (
        <div className="bg-white shadow-xl rounded-sm">
            <h1 className=" p-4 text-gray-900 uppercase border-b">Les Passagers et utilisateurs</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-left text-sm rtl:text-right text-gray-900 dark:text-gray-400">
                    <thead className="text-sm text-gray-900  dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                #
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Nom
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2 ">
                                Prenom
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Adresse
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Genre
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Date de Naissance
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Téléphone
                            </th>
                            <th scope="col" className="p-4 py-3 border-b-2">
                                Email
                            </th>
                            {/* <th scope="col" className="p-4 py-3 border-b-2">
                                Actions
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className='text-xs'>
                        {passagers.map((item: any) => (
                            <tr key={item.id} className="border-b border-gray-200 bg-stone-100 dark:border-gray-700">
                                <th scope="row" className="p-4 py-2  ">
                                    {item.id}
                                </th>
                                <td className=" p-4 py-2 ">
                                    {item.nom}
                                </td>
                                <td className=" p-4 py-2 ">
                                    {item.prenom}
                                </td>
                                <td className=" p-4 py-2">
                                    {item.adresse}
                                </td>
                                <td className=" p-4 py-2">
                                    {item.genre === 'm' ? 'Homme' : 'Femme'}
                                </td>
                                <td className=" p-4 py-2">
                                    {getDate(item.dateNaissance)}
                                </td>
                                <td className=" p-4 py-2">
                                    {item.telephone}
                                </td>
                                <td className=" p-4 py-2">
                                    {item.email}
                                </td>

                                {/* <td className=" p-4 py-2 flex flex-row items-start">
                                    <button onClick={() => {
                                        props.setData({
                                            id: item.id,
                                            nom: item.nom,
                                            prenom: item.prenom,
                                            adresse: item.adresse,
                                            dateNaissance: getDate(item.dateNaissance),
                                            genre: item.genre,
                                            telephone: item.telephone,
                                            email: item.email
                                        }); props.childToParent(true)
                                    }} className="bg-cyan-500 text-white text-xs text-center p-2">Editer</button>
                                    <button onClick={() => handleButtonClick()} className="bg-red-500 text-white text-xs text-center p-2">Supprimer</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default PassagerTable