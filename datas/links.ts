import svg1 from '@/public/images/home.svg'
import svg2 from '@/public/images/road.svg'
import svg4 from '@/public/images/passager.svg'
import user from '@/public/images/user.svg'
import bus from '@/public/images/bus-logo.svg'
import agence from '@/public/images/agence.svg'
import job from '@/public/images/job.svg'
import recette from '@/public/images/recette.svg'
import ticket from '@/public/images/ticket.svg'
import reservation from '@/public/images/reservation.svg'
import depense from '@/public/images/depenses.svg'
import fiche from '@/public/images/fiche.svg'
import access from '@/public/images/access.svg'
import setting from '@/public/images/setting.svg'

export const LinksCaissier : {label: string, selected: boolean, icon: string, link: string }[] = [
    {
        label: "Accueil",
        selected: false,
        icon: svg1,
        link: "/dashboard/caisse/home",
    },
    {
        label: "Trajets",
        selected: false,
        icon: svg2,
        link: "/dashboard/caisse/trajets",
    },
    {
        label: "Voyages",
        selected: false,
        icon: svg2,
        link: "/dashboard/caisse/voyages",
    },
    
    {
        label: "Passagers",
        selected: false,
        icon: svg4,
        link: "/dashboard/caisse/passengers",
    }
]

export const LinkComptable : {label: string, selected: boolean, icon: string, link: string }[] = [
    {
        label: "Accueil",
        selected: false,
        icon: svg1,
        link: "/dashboard/comptable/home",
    },
    {
        label: "Employés et Salaires",
        selected: false,
        icon: svg4,
        link: "/dashboard/comptable/employees",
    },
    {
        label: "Dépenses",
        selected: false,
        icon: depense,
        link: "/dashboard/comptable/depenses",
    },
    {
        label: "Productions",
        selected: false,
        icon: recette,
        link: "/dashboard/comptable/production",
    },
    {
        label: "Factures",
        selected: false,
        icon: recette,
        link: "/dashboard/comptable/factures",
    },
]

export const LinksAdmin : {label: string, selected: boolean, icon: string, link: string }[] = [
    {
        label: "Accueil",
        selected: false,
        icon: svg1,
        link: "/dashboard/admin/home",
    },
    {
        label: "Employés et utilisateurs",
        selected: false,
        icon: user,
        link: "/dashboard/admin/employees"
    },
    {
        label: "Véhicules",
        selected: false,
        icon: bus,
        link: "/dashboard/admin/vehicles"
    },
    {
        label: "Voyages",
        selected: false,
        icon: svg2,
        link: "/dashboard/admin/voyages"
    },
    {
        label: "Trajets",
        selected: false,
        icon: svg2,
        link: "/dashboard/admin/trajets"
    },
     {
        label: "Agences",
        selected: false,
        icon: agence,
        link: "/dashboard/admin/agences"
    },
    {
        label: "Postes",
        selected: false,
        icon: job,
        link: "/dashboard/admin/postes",
    },
    {
        label: "Passagers",
        selected: false,
        icon: svg4,
        link: "/dashboard/admin/passagers",
    },
    {
        label: "Recettes",
        selected: false,
        icon: recette,
        link: "/dashboard/admin/recettes",
    },
    {
        label: "Tickets",
        selected: false,
        icon: ticket,
        link: "/dashboard/admin/ticket",
    },
    {
        label: "Fiche de recette",
        selected: false,
        icon: fiche,
        link: "/dashboard/admin/fiche",
    },
    {
        label: "Reservations",
        selected: false,
        icon: reservation,
        link: "/dashboard/admin/reservations",
    },
    {
        label: "Depenses et productions",
        selected: false,
        icon: depense,
        link: "/dashboard/admin/depenses",
    },
    {
        label: "Droits d'acces",
        selected: false,
        icon: access,
        link: "/dashboard/admin/access",
    },
    {
        label: "Factures",
        selected: false,
        icon: setting,
        link: "/dashboard/admin/factures",
    }
]

export const LinksDirector : {label: string, selected: boolean, icon: string, link: string }[] = [
    {
        label: "Accueil",
        selected: false,
        icon: svg1,
        link: "/dashboard/directeur/home",
    },
    {
        label: "Employés et utilisateurs",
        selected: false,
        icon: user,
        link: "/dashboard/directeur/employes"
    },
    {
        label: "Véhicules",
        selected: false,
        icon: bus,
        link: "/dashboard/directeur/vehicules"
    },
    {
        label: "Voyages",
        selected: false,
        icon: svg2,
        link: "/dashboard/directeur/voyages"
    },
    {
        label: "Trajets",
        selected: false,
        icon: svg2,
        link: "/dashboard/directeur/trajets"
    },
    {
        label: "Passagers",
        selected: false,
        icon: svg4,
        link: "/dashboard/directeur/passagers",
    },
    {
        label: "Recettes",
        selected: false,
        icon: recette,
        link: "/dashboard/directeur/recettes",
    },
    {
        label: "Tickets",
        selected: false,
        icon: ticket,
        link: "/dashboard/directeur/ticket",
    },
    {
        label: "Fiche de recette",
        selected: false,
        icon: fiche,
        link: "/dashboard/directeur/fiche",
    },
    {
        label: "Reservations",
        selected: false,
        icon: reservation,
        link: "/dashboard/directeur/reservations",
    },
    {
        label: "Depenses et productions",
        selected: false,
        icon: depense,
        link: "/dashboard/directeur/depenses",
    },
    // {
    //     label: "Paramêtres",
    //     selected: false,
    //     icon: setting,
    //     link: "/dashboard/directeur/setting",
    // }
]