import { createTheme } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1200,
            xl: 1920,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    height: "78px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "none",
                    background: "#fff",
                    transition: "all 0.5s ease-in-out",
                    borderBottom: "1px solid #e6e6e9",
                    [theme.breakpoints.down("md")]: {
                        height: "58px",
                    },
                }),
            },
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    margin: "0 4px",
                    "&.Mui-selected": {
                        backgroundColor: "#5263FF",
                        color: "#fff !important",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        border: "unset",
                        "&:hover": {
                            backgroundColor: "#5263FF",
                        },
                    },
                    "&.Mui-disabled": {
                        opacity: 1,
                        border: "1px solid #E6E6E9",
                        background: "#F7F7F8",
                        "& svg": {
                            color: "#ADAFB9",
                        },
                    },
                },
                text: {
                    color: "#AEB0B4",
                },
                ellipsis: {
                    color: "#AEB0B4",
                },
                previousNext: {
                    border: "1px solid #BFC0C8",
                    boxShadow: "0px 0px 2px 0px #E5E7EB",
                    margin: "0px 20px",
                },
                icon: {
                    color: "#000000",
                    width: "15px",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputLabel-root": {
                        color: "#ADAFB9"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#5263FF"
                    },

                    "&.custom-date-picker .MuiOutlinedInput-root": {
                        border: "1px solid #e6e6e9",
                        boxShadow: "none",
                        "& input": {
                            padding: "12px 16px", // px: 2, py: 1.5
                        },
                        "& fieldset": {
                            border: "none",
                        },
                        "& input::placeholder": {
                            color: "#ADAFB9",
                            opacity: 1,
                        },
                        "&.Mui-disabled": {
                            background: "#F7F7F8",
                            WebkitTextFillColor: "#ADAFB9",
                            overflow: "hidden",
                        },
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 42,
                    height: 26,
                    padding: 0,
                },
                switchBase: {
                    padding: 0,
                    margin: 2,
                    transitionDuration: "300ms",
                    "&.Mui-checked": {
                        transform: "translateX(16px)",
                        color: "#fff",
                        "& + .MuiSwitch-track": {
                            opacity: 1,
                            border: 0,
                            backgroundColor: "#2ECA45",
                        },
                        "&.Mui-disabled + .MuiSwitch-track": {
                            opacity: 0.5,
                        },
                    },
                    "&.Mui-focusVisible .MuiSwitch-thumb": {
                        color: "#33cf4d",
                        border: "6px solid #fff",
                    },
                    "&.Mui-disabled .MuiSwitch-thumb": {
                        color: "#E0E0E0", // Fallback if dark mode is not applied
                    },
                    "&.Mui-disabled + .MuiSwitch-track": {
                        opacity: 0.7,
                    },
                },
                thumb: {
                    boxSizing: "border-box",
                    width: 22,
                    height: 22,
                },
                track: {
                    borderRadius: 13,
                    backgroundColor: "#E9E9EA",
                    opacity: 1,
                    transition: "background-color 500ms",
                },
            },
        },
        MuiSlider: {
            styleOverrides: {
                rail: {
                    background: "#686A73",
                    opacity: 0.1,
                },
                thumb: {
                    "&::after": {
                        width: "24px",
                        height: "24px",
                        border: "8px solid #fff",
                        filter:
                            "drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.10)) drop-shadow(0px 1px 3px rgba(16, 24, 40, 0.10))",
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "&.custom-date-picker .MuiIconButton-root": {
                        color: "#1A1A1A",
                        fontSize: 18,
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: "#000000",
                    "&.Mui-disabled": {
                        color: "#000000",
                    },
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    color: '#000000',
                    "&.Mui-disabled": {
                        color: "#000000",
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: '#000000',
                    "&.Mui-disabled": {
                        color: "#000000",
                    },
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                standard: {
                    border: "2px solid #fff",
                    fontSize: "8px",
                    padding: "0px",
                    color: "#fff",
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: "10px",
                },
                contained: {
                    boxShadow: "none",
                },
                sizeSmall: {
                    padding: "6px 16px",
                },
                sizeMedium: {
                    padding: "8px 20px",
                },
                sizeLarge: {
                    padding: "11px 24px",
                },
                textSizeSmall: {
                    padding: "7px 12px",
                },
                textSizeMedium: {
                    padding: "9px 16px",
                },
                textSizeLarge: {
                    padding: "12px 16px",
                },
                outlinedPrimary: {
                    borderColor: "#E6E6E9",
                    color: "#000000",
                    backgroundColor: '#FFF'
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: false,
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: "32px 24px",
                    "&:last-child": {
                        paddingBottom: "32px",
                    },
                },
            },
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: "h6",
                },
                subheaderTypographyProps: {
                    variant: "body2",
                },
            },
            styleOverrides: {
                root: {
                    padding: "32px 24px",
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    boxSizing: "border-box",
                    margin: 0,
                    padding: 0,
                },
                html: {
                    MozOsxFontSmoothing: "grayscale",
                    WebkitFontSmoothing: "antialiased",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100%",
                    width: "100%",
                },
                body: {
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                    minHeight: "100%",
                    width: "100%",
                },
                "#__next": {
                    display: "flex",
                    flex: "1 1 auto",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: "#8D8D8D",
                    "&.Mui-selected": {
                        color: "#5263FF",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    "&::placeholder": {
                        color: "#ADAFB9",
                        letterSpacing: "-1%",
                        fontSize: "16px",
                        fontWeight: 400,
                        opacity: 1,
                    },
                },
                root: {
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#111827",
                    lineHeight: "160%",
                    // boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                },
                notchedOutline: {
                    borderColor: "#E9EAEC",
                    borderRadius: "10px",
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    "& .MuiTableCell-root": {
                        border: "1px solid #e6e6e9",
                        borderTop: 0,
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontWeight: 600,
                        color: "#737373",
                        backgroundColor: "#f7f7f8",
                        height: "33px",
                        padding: "5px 12px",
                    },
                },
            },
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    "& .MuiTableRow-root": {
                        "&:nth-of-type(even)": {
                            backgroundColor: "#f7f7f8",
                        },
                    },
                    "& .MuiTableCell-root": {
                        color: "#030712",
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        letterSpacing: "-1%",
                        padding: "17px 16px",
                        border: "1px solid #e6e6e9",
                    },
                    "& .MuiTableRow-root .MuiTableCell-root:first-of-type": {
                        borderLeft: 0,
                    },
                    "& .MuiTableRow-root .MuiTableCell-root:last-of-type": {
                        borderRight: 0,
                    },
                    "& .MuiTableRow-root:last-of-type .MuiTableCell-root": {
                        borderBottom: 0,
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: "#111827",
                    fontSize: 20,
                    marginRight: "8px",
                },
            },
            defaultProps: {
                IconComponent: FiChevronDown,
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: '#5263FF',
                    '&.Mui-checked': {
                        color: '#5263FF',
                    },
                },
            },
        },
    },

    palette: {
        // neutral: {
        //     50: "#f7f7f8",
        //     100: "#e6e6e9",
        //     200: "#d4d4da",
        //     300: "#bfc0c8",
        //     400: "#adafb9",
        //     500: "#8c8e9c",
        //     600: "#66687c",
        //     700: "#40435b",
        //     800: "#333650",
        //     900: "#1a1d3a",
        // },
        action: {
            active: "#6B7280",
            focus: "rgba(55, 65, 81, 0.12)",
            hover: "rgba(55, 65, 81, 0.04)",
            selected: "#e1e2ee",
            disabledBackground: "#F1F2F4",
            disabled: "rgba(55, 65, 81, 0.26)",
        },
        background: {
            default: "#FFFFFF",
            paper: "#FFFFFF",
        },
        divider: "#e6e6e9",
        primary: {
            main: "#5263FF",
            light: "#7583FF",
            dark: "#0F27FF",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#172C57",
            light: "#274B95",
            dark: "#122345",
            contrastText: "#FFFFFF",
        },
        success: {
            main: "#27BE69",
            light: "#45D985",
            dark: "#1F9854",
            contrastText: "#000000",
        },
        info: {
            main: "#51C0FF",
            light: "#75CDFF",
            dark: "#0FA8FF",
            contrastText: "#000000",
        },
        warning: {
            main: "#FFBF0F",
            light: "#FFCB3D",
            dark: "#D69D00",
            contrastText: "#000000",
        },
        error: {
            main: "#EA4334",
            light: "#EE695D",
            dark: "#D02516",
            contrastText: "#000000",
        },
        text: {
            primary: "#030712",
            secondary: "#FFFFFF",
            disabled: "#899DB7",
        },
    },
    shape: {
        borderRadius: 8,
    },
    shadows: [
        "none",
        "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
        "0px 1px 2px rgba(100, 116, 139, 0.12)",
        "0px 1px 4px rgba(100, 116, 139, 0.12)",
        "0px 1px 5px rgba(100, 116, 139, 0.12)",
        "0px 1px 6px rgba(100, 116, 139, 0.12)",
        "0px 2px 6px rgba(100, 116, 139, 0.12)",
        "0px 3px 6px rgba(100, 116, 139, 0.12)",
        "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
        "0px 5px 12px rgba(100, 116, 139, 0.12)",
        "0px 5px 14px rgba(100, 116, 139, 0.12)",
        "0px 5px 15px rgba(100, 116, 139, 0.12)",
        "0px 6px 15px rgba(100, 116, 139, 0.12)",
        "0px 7px 15px rgba(100, 116, 139, 0.12)",
        "0px 8px 15px rgba(100, 116, 139, 0.12)",
        "0px 9px 15px rgba(100, 116, 139, 0.12)",
        "0px 10px 15px rgba(100, 116, 139, 0.12)",
        "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
        "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
        "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
        "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
        "0px 25px 50px rgba(100, 116, 139, 0.25)",
        "0px 25px 50px rgba(100, 116, 139, 0.25)",
        "0px 25px 50px rgba(100, 116, 139, 0.25)",
        "0px 25px 50px rgba(100, 116, 139, 0.25)",
    ],
    typography: {
        button: {
            fontWeight: 400,
        },
        fontFamily: `"Inter, Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
			 Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.5,
        },
        body2: {
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: 1.57,
        },
        subtitle1: {
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1,
        },
        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: 1.57,
        },
        overline: {
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
            lineHeight: 2.5,
            textTransform: "uppercase",
        },
        caption: {
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: 1.66,
        },
        h1: {
            fontWeight: 700,
            fontSize: "3.5rem",
            lineHeight: "130%",
        },
        h2: {
            fontWeight: 700,
            fontSize: "3rem",
            lineHeight: "130%",
        },
        h3: {
            fontWeight: 500,
            fontSize: "2.25rem",
            lineHeight: "130%",
        },
        h4: {
            fontWeight: 500,
            fontSize: "2rem",
            lineHeight: "130%",
        },
        h5: {
            fontWeight: 500,
            fontSize: "1.5rem",
            lineHeight: "130%",
        },
        h6: {
            fontWeight: 500,
            fontSize: "1.125rem",
            lineHeight: "130%",
        },
    },
});
