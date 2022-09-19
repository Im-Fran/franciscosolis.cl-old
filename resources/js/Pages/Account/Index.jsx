import AccountLayout from "@/Layouts/AccountLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Index({ notifications }) {
    return (
        <AccountLayout title="My Account">
            <FontAwesomeIcon className="text-6xl" icon="fas fa-screwdriver-wrench"/>
            <h1 className="text-2xl mt-5">We're currently working on this feature!</h1>
        </AccountLayout>
    );
}
