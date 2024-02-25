"use client"

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import CardVoyage from "@/components/cardVoyage";
import ModalTrajet from "@/components/modalTrajets";
import { selectVoyage } from "@/functions/actionsClient";
import { getDateFormat } from "@/functions/actionsClient";
import Popup from "@/components/ui/popup";
// import ReservationTable from "@/components/reservation/reservationTable";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import ComponentTicketPrint from "@/components/ui/ComponentToPrint";
import Image from "next/image";
import svg from "@/public/images/loader.svg";
export default function Page() {

    return(
        <div></div>
    )
}