import { AppBar, Stack } from "@mui/material";
import Logo from "../Logo";
import AccountPopover from "../AccountPopover";
import logoBlack from "@/assets/images/logo-black.png";

const OnboardingNavbar = () => {
    return (
        <AppBar className="!px-8">
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Logo src={logoBlack} full={true} />
                <AccountPopover />
            </Stack>
        </AppBar>
    )
}

export default OnboardingNavbar;