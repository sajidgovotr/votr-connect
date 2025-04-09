import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
    subDays,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
} from "date-fns";
import { MdArrowDropDown } from "react-icons/md";
import { Box, Button, Typography, Paper, List, ListItemButton } from "@mui/material";
import calendar from "../../assets/svgs/calendar_today.svg";

const CustomDateRangePicker = ({ onDateSelect }: { onDateSelect: any }) => {
    const [state, setState] = useState([
        { startDate: new Date(), endDate: new Date(), key: "selection" },
    ]);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<string | null>("Last 30 Days");
    const pickerRef = useRef<HTMLDivElement>(null);

    const handleSelect = (ranges: any) => {
        setState([ranges.selection]);
        setSelectedPreset(null);
    };

    const setPresetRange = (range: any, label: any) => {
        setState([
            { ...state[0], startDate: range.startDate, endDate: range.endDate },
        ]);
        setSelectedPreset(label);
    };

    const presetRanges = [
        { label: "Today", range: { startDate: new Date(), endDate: new Date() } },
        { label: "Yesterday", range: { startDate: subDays(new Date(), 1), endDate: subDays(new Date(), 1) } },
        { label: "This Week", range: { startDate: startOfWeek(new Date()), endDate: endOfWeek(new Date()) } },
        { label: "Last Week", range: { startDate: startOfWeek(subDays(new Date(), 7)), endDate: endOfWeek(subDays(new Date(), 7)) } },
        { label: "This Month", range: { startDate: startOfMonth(new Date()), endDate: endOfMonth(new Date()) } },
        { label: "Last Month", range: { startDate: startOfMonth(subDays(new Date(), 30)), endDate: endOfMonth(subDays(new Date(), 30)) } },
        { label: "This Year", range: { startDate: startOfYear(new Date()), endDate: endOfYear(new Date()) } },
        { label: "Last Year", range: { startDate: startOfYear(subDays(new Date(), 365)), endDate: endOfYear(subDays(new Date(), 365)) } },
        { label: "Last 30 Days", range: { startDate: subDays(new Date(), 30), endDate: new Date() } },
        { label: "All Time", range: { startDate: new Date(2000, 0, 1), endDate: new Date() } },
    ];

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={pickerRef} className="relative inline-block">
            <Box
                className="shadow bg-white flex items-center gap-2 !py-3 !px-4 rounded-lg cursor-pointer"
                onClick={() => setShowPicker(!showPicker)}
            >
                <img src={calendar} alt="calendar" width={16} />
                <Typography className="text-gray-500">Show:</Typography>
                <Typography className="text-gray-800 font-medium">
                    {selectedPreset ||
                        `${state[0].startDate.toLocaleDateString()} - ${state[0].endDate.toLocaleDateString()}`}
                </Typography>
                <MdArrowDropDown className="text-gray-400" />
            </Box>

            {showPicker && (
                <Paper elevation={3} className="absolute right-0 z-50 flex flex-col md:flex-row">
                    <List className="border-r border-gray-200 w-full md:w-40">
                        {presetRanges.map((preset) => (
                            <ListItemButton
                                key={preset.label}
                                selected={selectedPreset === preset.label}
                                onClick={() => setPresetRange(preset.range, preset.label)}
                                className="text-sm hover:bg-blue-50 hover:text-blue-600"
                            >
                                {preset.label}
                            </ListItemButton>
                        ))}
                    </List>
                    <div className="p-4">
                        <DateRange
                            editableDateInputs
                            onChange={handleSelect}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            months={window.innerWidth < 870 ? 1 : 2}
                            direction="horizontal"
                            showMonthAndYearPickers
                            showDateDisplay
                            rangeColors={["#4c6ef5"]}
                        />
                        <Box className="flex justify-between mt-2 border-t pt-2">
                            <Button variant="outlined" onClick={() => setShowPicker(false)}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setShowPicker(false);
                                    onDateSelect?.(state[0]);
                                }}
                            >
                                Apply
                            </Button>
                        </Box>
                    </div>
                </Paper>
            )}
        </div>
    );
};

export default CustomDateRangePicker;
