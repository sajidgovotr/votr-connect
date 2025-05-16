import { useState } from 'react';
import Card from '@/components/Card';
import Table from '@/components/DynamicTable';
import CustomButton from '@/components/CustomButton';
import Search from '@/components/Search';
import { Box, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import TablePagination from '@/components/Paginations/TablePagination/TablePagination';
import { FiPlus } from 'react-icons/fi';
import { EditIcon } from '@/assets/svgs/custom-icons';
import { Chip } from '@/components';
import Modal from '@/components/Modal';
import Input from '@/components/Textfields/input';
import SelectBox from '@/components/SelectBox';
import CloseIcon from '@mui/icons-material/Close';
import updateInfoIcon from '@/assets/images/update-info-icon.png';
import { Stack, Grid } from '@mui/material';

const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
    { value: 'other', label: 'Other' },
];

const mockContacts = [
    {
        name: 'Megan A. Smith',
        email: 'smithyones@gmail.com',
        title: 'CEO',
        role: 'Tech Contact - Onboarding',
        phone: '631-205-6363',
        status: 'Active',
    },
    {
        name: 'Stanley L. Wyatt',
        email: 'stanleyones@dayrep.com',
        title: 'CFO',
        role: 'Operational Contact',
        phone: '219-659-0169',
        status: 'Inactive',
    },
    {
        name: 'Rachel K. Johnson',
        email: 'rachel123@gmail.com',
        title: 'CTO',
        role: 'Billing Contact',
        phone: '415-555-0198',
        status: 'Active',
    },
    {
        name: 'Tobias R. Clarke',
        email: 'tobias.clarke@example.com',
        title: 'COO',
        role: 'Tech Contact - Post Integration',
        phone: '702-555-0123',
        status: 'Inactive',
    },
    {
        name: 'Amanda L. Perry',
        email: 'amanda.perry@outlook.com',
        title: 'CMO',
        role: 'Tech Contact - Onboarding',
        phone: '305-555-0147',
        status: 'Active',
    },
    {
        name: 'Nathan D. Reed',
        email: 'nathandrew@email.com',
        title: 'VP of Engineering',
        role: 'Operational Contact',
        phone: '213-555-0178',
        status: 'Active',
    },
    {
        name: 'Sofia M. Torres',
        email: 'sofiatorres@live.com',
        title: 'VP of Sales',
        role: 'Billing Contact',
        phone: '512-555-0189',
        status: 'Active',
    },
    {
        name: 'Lucas J. Wang',
        email: 'lucaswang1990@yahoo.com',
        title: 'VP of Marketing',
        role: 'Tech Contact - Post Integration',
        phone: '404-555-0134',
        status: 'Inactive',
    },
    {
        name: 'Olivia H. Brown',
        email: 'oliviah@gmail.com',
        title: 'VP of Product',
        role: 'Tech Contact - Onboarding',
        phone: '206-555-0111',
        status: 'Active',
    },
    {
        name: 'James T. Miller',
        email: 'jamestmiller@protonmail.com',
        title: 'Director of HR',
        role: 'Operational Contact',
        phone: '303-555-0177',
        status: 'Inactive',
    },
    {
        name: 'Isabella G. White',
        email: 'isabellawhite@gmail.com',
        title: 'Director of Operations',
        role: 'Billing Contact',
        phone: '212-555-0190',
        status: 'Active',
    },
    {
        name: 'Elijah Q. Hall',
        email: 'elijahq@icloud.com',
        title: 'Director of IT',
        role: 'Tech Contact - Post Integration',
        phone: '718-555-0164',
        status: 'Active',
    },
    {
        name: 'Grace P. Taylor',
        email: 'graceptaylor@hotmail.com',
        title: 'Product Manager',
        role: 'Tech Contact - Onboarding',
        phone: '847-555-0152',
        status: 'Active',
    },
    {
        name: 'Liam R. King',
        email: 'liamking@aol.com',
        title: 'Sales Manager',
        role: 'Operational Contact',
        phone: '202-555-0195',
        status: 'Inactive',
    },
    {
        name: 'Zoe C. Davis',
        email: 'zoe.davis@gmail.com',
        title: 'Marketing Specialist',
        role: 'Billing Contact',
        phone: '408-555-0161',
        status: 'Active',
    },
    {
        name: 'Samuel Y. Johnson',
        email: 'samuel.johnson@yamil.com',
        title: 'Business Analyst',
        role: 'Tech Contact - Post Integration',
        phone: '919-555-0120',
        status: 'Active',
    },
];

const columns = [
    {
        key: 'name',
        name: 'Full Name',
        align: 'left',
        component: (row: any) => (
            <Box>
                <Typography fontWeight={600} fontSize={15} color="#222">
                    {row.name}
                </Typography>
                <Typography fontSize={13} color="#A0AEC0" className="-mt-1">
                    {row.email}
                </Typography>
            </Box>
        ),
    },
    { key: 'title', name: 'Title', align: 'left' },
    { key: 'role', name: 'Role', align: 'left' },
    { key: 'phone', name: 'Phone', align: 'left' },
    {
        key: 'status',
        name: 'Status',
        align: 'left',
        component: (row: any) => (
            <Chip
                name={row.status}
                className={
                    (row.status === 'Active'
                        ? '!bg-[#E6F9F0] !text-[#34A853]'
                        : '!bg-[#FFF4E6] !text-[#FF9900]')
                    + ' !font-semibold !rounded-full !px-4 !py-1'
                }
                color={row.status === 'Active' ? '#34A853' : '#FF9900'}
            />
        ),
    },
    {
        key: 'action',
        name: 'Action',
        align: 'right',
        component: (row: any, _idx: number, openEdit: (row: any) => void) => (
            <CustomButton
                title="Edit"
                variant="outlined"
                startIcon={<EditIcon />}
                className="!rounded-full !px-4 !py-1 !text-sm !font-semibold !text-black"
                onClick={() => openEdit(row)}
            />
        ),
    },
];

const ContactModal = ({ open, onClose, onSubmit, initialValues, isEdit }: any) => {
    const [form, setForm] = useState(
        initialValues || {
            firstName: '',
            lastName: '',
            title: '',
            role: '',
            email: '',
            phone: '',
            country: 'us',
        }
    );
    const handleChange = (key: string, value: string) => {
        setForm((prev: any) => ({ ...prev, [key]: value }));
    };
    return (
        <Modal open={open} onClose={onClose} maxWidth="sm">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit(form);
                }}
            >
                <Box className="!rounded-2xl !bg-white !p-0" sx={{ overflow: 'hidden' }}>
                    {/* Header */}
                    <Box className="!flex !items-center !justify-between !px-3 !pt-8 !pb-4 !bg-[#F6F7FF]">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <img src={updateInfoIcon} alt="Add Contact" className="!w-24 !h-20" />
                            <Typography variant="h5" fontWeight={700} className="!text-[1.5rem]">
                                {isEdit ? 'Edit Contact' : 'Add New Contact'}
                            </Typography>
                        </Stack>
                        <Box display={"flex"} justifyContent={"center"} alignSelf={"flex-start"} height={"100%"}>
                            <CloseIcon className="!cursor-pointer" onClick={onClose} height={16} width={16} />
                        </Box>
                    </Box>
                    <Box className="!pt-2">
                        <Box className="!px-8">
                            <Grid container spacing={2} className="!mb-2">
                                <Grid item xs={12} md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="Eg. John"
                                        type="text"
                                        value={form.firstName}
                                        handleChangeValue={v => handleChange('firstName', v)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Eg. Anderson"
                                        type="text"
                                        value={form.lastName}
                                        handleChangeValue={v => handleChange('lastName', v)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        label="Title"
                                        placeholder="Eg. John"
                                        type="text"
                                        value={form.title}
                                        handleChangeValue={v => handleChange('title', v)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <SelectBox
                                        label="Role"
                                        placeholder="Select here"
                                        value={form.role}
                                        options={roleOptions}
                                        handleChangeValue={v => handleChange('role', v)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        label="Email"
                                        placeholder="example@email.com"
                                        type="email"
                                        value={form.email}
                                        handleChangeValue={v => handleChange('email', v)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    {/* For phone, you can use a phone input library or keep it simple */}
                                    <Input
                                        label="Phone Number"
                                        placeholder="+1 (XXX) XX XXX"
                                        type="text"
                                        value={form.phone}
                                        handleChangeValue={v => handleChange('phone', v)}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Stack direction="row" spacing={2} justifyContent="space-between" className="!mt-6 !px-8 !py-6 !bg-gray-100">
                            <CustomButton
                                title="Cancel"
                                variant="outlined"
                                onClick={onClose}
                                sx={{ width: '100%' }}
                            />
                            <CustomButton
                                title={isEdit ? 'Save' : 'Add'}
                                variant="contained"
                                type="submit"
                                sx={{ width: '100%' }}
                            />
                        </Stack>
                    </Box>
                </Box>
            </form>
        </Modal>
    );
};

const ContactsPage = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(7);
    const total = 153;
    const [modalOpen, setModalOpen] = useState(false);
    const [editContact, setEditContact] = useState<any>(null);

    const openEdit = (row: any) => {
        setEditContact(row);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setEditContact(null);
    };
    const handleSubmit = (_data: any) => {
        // handle add/edit logic here
        closeModal();
    };

    return (
        <Box className="w-full min-h-screen bg-[#FAFAFB] p-8">
            <Card className="mx-auto p-6 rounded-2xl shadow bg-white border border-[#F4F4F6] flex flex-col !gap-6">
                {/* Header Row */}
                <Box className="flex items-center justify-between gap-3">
                    <Box className="flex items-center gap-2 flex-1">
                        <Search
                            value={search}
                            handleChangeValue={setSearch}
                            placeholder="Search Contacts"
                            size="small"
                            className="!rounded-lg !bg-[#F9FAFB] !border !border-[#E6E6E9] max-w-2xs"
                        />
                        <CustomButton
                            title="Filter"
                            variant="outlined"
                            startIcon={<FilterAltOutlinedIcon fontSize="small" />}
                        />
                    </Box>
                    <CustomButton
                        title="Add New Contact"
                        variant="contained"
                        startIcon={<FiPlus />}
                        onClick={() => setModalOpen(true)}
                    />
                </Box>
                {/* Table */}
                <Table
                    data={mockContacts}
                    columns={columns.map(col =>
                        col.key === 'action'
                            ? { ...col, component: (row: any, idx: number) => col.component ? col.component(row, idx, openEdit) : null }
                            : col
                    )}
                    isLoading={false}
                    limit={limit}
                    page={page}
                    total={total}
                    hidePagination
                    square
                    borderLess
                />
                {/* Pagination Row */}
                <Box className="flex items-center justify-center ">
                    <Typography fontSize={13} color="#A0AEC0">
                        Showing 1 to {limit} of {total}
                    </Typography>
                    <TablePagination
                        limit={limit}
                        page={page}
                        total={total}
                        handlePageChange={setPage}
                        handleLimitChange={setLimit}
                    />
                </Box>
                <ContactModal
                    open={modalOpen}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                    initialValues={editContact}
                    isEdit={!!editContact}
                />
            </Card>
        </Box>
    );
};

export default ContactsPage;