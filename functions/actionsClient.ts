
const getTrajet = async () => {
    const res = await fetch("/api/trajets", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};

const getVoyage = async () => {
    const res = await fetch("/api/voyages", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};


const getVoyageToDay = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const dateDepart = `${year}-${month}-${day}`
    const res = await fetch(`/api/voyages?dateDepart=${dateDepart}`, { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};

const getReservation = async () => {
    const res = await fetch("/api/reservations", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};

const getReservationById = async (id: string) => {
    const res = await fetch("/api/reservations/" + id, { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};


const getBus = async () => {
    const res = await fetch("/api/bus", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};

const getPassager = async () => {
    const res = await fetch("/api/passagers", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};


const getEmploye = async () => {
    const res = await fetch("/api/employees", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};

const getUtilisateur = async () => {
    const res = await fetch("/api/utilisateurs", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};

const getPoste = async () => {
    const res = await fetch("/api/postes", { cache: "no-store" })
    if (!res.ok) {
        throw new Error("Failed")
    }
    const data = await res.json();
    return data
};


export const selectReservation = async () => {
    const tabPassager: any[] = await getPassager();
    const tabVoyages: any[] = await getVoyage();
    const tabReservation: any[] = await getReservation();
    const tab: any[] = [];
    tabReservation.map((r) => {
        tabPassager.map((i) => {
            tabVoyages.map((j) => {
                if ((r.passagerId === i.id) && (r.voyageId === j.id)) {
                    tab.push({ passager: i, voyages: j, reservation: r })
                }
            })
        })
    })
    return tab
}

export const selectReservationById = async (id: string) => {
    const tabPassager: any[] = await getPassager();
    const tabVoyages: any[] = await getVoyage();
    const tabReservation: any = await getReservationById(id);
    const tab: any[] = [];
    tabPassager.map((i) => {
        tabVoyages.map((j) => {
            if ((tabReservation.passagerId === i.id) && (tabReservation.voyageId === j.id)) {
                tab.push({ passager: i, voyages: j, reservation: tabReservation })
            }
        })
    })
    return tab
}

export const selectVoyage = async () => {
    const tabVoyages: any[] = await getVoyage();
    const tab: any[] = [];
    const tabTrajets: any[] = await getTrajet();
    const tabBus: any[] = await getBus();
    tabVoyages.map((r) => {
        tabTrajets.map((i) => {
            tabBus.map((j) => {
                if ((r.trajetId === i.id) && (parseInt(r.busId) === j.id)) {
                    tab.push({ trajet: i, voyages: r, bus: j })
                }
            })
        })
    })
    return tab
}



export const selectVoyageToDay = async () => {
    const tabVoyages: any[] = await getVoyageToDay();
    const tab: any[] = [];
    const tabTrajets: any[] = await getTrajet();
    const tabBus: any[] = await getBus();
    tabVoyages.map((r) => {
        tabTrajets.map((i) => {
            tabBus.map((j) => {
                if ((r.trajetId === i.id) && (parseInt(r.busId) === j.id)) {
                    tab.push({ trajet: i, voyages: r, bus: j })
                }
            })
        })
    })
    return tab
}

export const selectEmploye = async () => {
    const tabEmploye: any[] = await getEmploye();
    const tabUser: any[] = await getUtilisateur();
    const tab: any[] = [];
    tabUser.map((r) => {
        tabEmploye.map((i) => {
            if (r.employeId === i.id) {
                tab.push({ employe: i, user: r })
            }
        })
    })
    return tab
}

export const getDateFormat = (str: string) => {
    const date = new Date(str);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = (date.getDate()) < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    return `${year}-${month}-${day}`
}
