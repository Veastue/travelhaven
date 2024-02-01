import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";


const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const reservation = await getReservations({
        authorId: currentUser.id
    });

    if(reservation.length ===0){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No reservations found!"
                    subtitle="looks like you have no reservations on your properties"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <div className="pt-16"/>
            <ReservationsClient
                reservations={reservation}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationsPage