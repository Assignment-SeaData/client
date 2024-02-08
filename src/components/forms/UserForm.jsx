import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CountrySelect from '../ContryList';

const UserForm = ({ onClose, onSubmit, selectedUser }) => {
    const defaultUserValue = {
        fullName: selectedUser.current?.fullName,
        country: selectedUser.current?.country,
        city: selectedUser.current?.city,
        email: selectedUser.current?.email,
        countryCode: selectedUser.current?.phoneNumber.split(' ')[0],
        phoneNumber: selectedUser.current?.phoneNumber.split(' ')[1],
        jobTitle: selectedUser.current?.jobTitle,
        experience: selectedUser.current?.experience,
    }

    const [userData, setUserData] = useState(defaultUserValue);
    // const submitDisable = (userData.firstName == defaultUserValue.firstName) && userData.lastName == defaultUserValue.lastName || userData.firstName == '' || userData.lastName == ''

    const handleReset = () => {
        setUserData(defaultUserValue)
    }

    return <Dialog open onClose={onClose}>
        <DialogTitle>
            {selectedUser.current == null ? 'Add User' : 'Edit User'}
        </DialogTitle>
        <DialogContent>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container justifyContent={'center'} spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
                            defaultValue={userData.fullName}
                            required
                            fullWidth
                            id="fullname"
                            label="Full name"
                            name="fullname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                            defaultValue={userData.country}
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                            defaultValue={userData.city}
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            defaultValue={userData.email}
                            required
                            fullWidth
                            type='email'
                            id="email"
                            label="Email"
                            name="email"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CountrySelect
                            // value={userData.phoneNumber[0]}
                            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                            defaultValue={userData.countryCode}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                            defaultValue={userData.phoneNumber}
                            required
                            fullWidth
                            id="phoneNumber"
                            label="Phone"
                            name="phoneNumber"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, jobTitle: e.target.value })}
                            defaultValue={userData.jobTitle}
                            required
                            fullWidth
                            id="jobTitle"
                            label="Job Title"
                            name="jobTitle"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
                            defaultValue={userData.experience}
                            required
                            fullWidth
                            type='number'
                            id="experience"
                            label="Experience"
                            name="experience"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        {/* <Button type="submit" disabled={submitDisable}>Submit</Button> */}
                        <Button type="submit">Submit</Button>
                        <Button onClick={onClose}>Close</Button>
                        <Button type='reset' onClick={handleReset}>Reset</Button>
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
    </Dialog>
}

export default UserForm