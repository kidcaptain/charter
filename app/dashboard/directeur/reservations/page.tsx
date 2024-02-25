"use client"


import ReservationTable from "@/components/reservation/reservationTable";

export default function Page() {

    return (
        <div className="w-full p-10">
            <div className=" py-4 flex justify-between items-start mb-2">
                <h1 className="text-xl text-gray-900 uppercase">Reservations</h1>
            </div>
            <div className="mt-4 gap-4 grid items-start grid-cols-4 mx-auto ">
                <section className={`  col-span-full`}>
                    <ReservationTable />
                </section>
            </div>
        </div>
    )
}