import { CircularProgress } from "@mui/material";

const FullPageLoader = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
            <CircularProgress />
        </div>
    )
}

export default FullPageLoader;