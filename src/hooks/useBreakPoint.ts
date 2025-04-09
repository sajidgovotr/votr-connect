import { Breakpoint, useMediaQuery, useTheme } from "@mui/material"

const useBreakPoint = (breakPoint?: Breakpoint | number) => {
    const theme = useTheme()
    const { breakpoints } = theme
    const hasReached = useMediaQuery(breakpoints.up(breakPoint || 'md'))

    return hasReached
}

export default useBreakPoint