import { Splash } from "@/pages";
import Routes from "@/routes";
import { useEffect, useState } from "react";

const AppContainer = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            setIsLoading(true);
        }
    }, [])

    if (isLoading) {
        return <Splash />;
    }

    return <Routes />;
};

export default AppContainer;
