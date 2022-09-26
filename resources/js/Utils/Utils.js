import { usePage } from "@inertiajs/inertia-react";
import toast from "react-hot-toast";

export function handleError(error, message){
    const { errors, flash } = usePage().props;
    if(errors.length === 0 || flash.find(it => !!it.error).length === 0) {
        toast.error(message, {
            duration: 5000,
        })
        console.log({
            message,
            error,
        })
    }
}
