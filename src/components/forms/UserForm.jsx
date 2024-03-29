import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CountryCodeSelect from '../CountryCodeSelect';
import CountrySelect from '../CountrySelect';
import CitySelect from '../CitySelect';

const UserForm = ({ onClose, onSubmit, selectedUser }) => {
    const defaultUserValue = {
        fullName: selectedUser.current?.fullName || '',
        country: selectedUser.current?.country || '',
        city: selectedUser.current?.city || '',
        email: selectedUser.current?.email || '',
        countryCode: selectedUser.current?.phoneNumber.split(' ')[0] || '',
        phoneNumber: selectedUser.current?.phoneNumber.split(' ')[1] || '',
        jobTitle: selectedUser.current?.jobTitle || '',
        experience: selectedUser.current?.experience || '',
    }

    const [userData, setUserData] = useState(defaultUserValue);
    const submitDisable = Object.keys(userData).every(key => userData[key] == defaultUserValue[key])

    const handleReset = () => {
        setUserData(defaultUserValue)
    }

    return <Dialog open onClose={onClose}>
        <DialogTitle>
            {selectedUser.current == null ? 'Add User' : 'Edit User'}
        </DialogTitle>
        <DialogContent>
            <Box component="form" onSubmit={(e) => onSubmit(e, userData)} noValidate sx={{ mt: 1 }}>
                <Grid container justifyContent={'center'} spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                            defaultValue={userData.fullName}
                            required
                            fullWidth
                            id="fullName"
                            label="Full name"
                            name="fullName"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CountrySelect
                            defaultValue={userData.country}
                            onChange={(newValue) => setUserData({ ...userData, country: newValue })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CitySelect
                            inputCountry={userData.country}
                            defaultValue={userData.city}
                            onChange={(newValue) => setUserData({ ...userData, city: newValue })}
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
                        <CountryCodeSelect
                            onChange={(event, newValue) => setUserData({ ...userData, countryCode: newValue ? `+${newValue}` : '' })}
                            defaultValue={userData.countryCode}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            sx={{
                                "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
                                    WebkitAppearance: "none",
                                    margin: 0,
                                },
                            }}
                            onChange={(e) => {
                                setUserData({ ...userData, phoneNumber: e.target.value })
                            }}
                            defaultValue={userData.phoneNumber}
                            required
                            fullWidth
                            type='number'
                            id="phoneNumber"
                            label="Phone"
                            name="phoneNumber"
                            inputProps={{
                                min: 0
                            }}
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
                            inputProps={{
                                min: 0,
                                max: 100,
                                step: '0.1'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                        <Button type="submit" disabled={submitDisable}>Submit</Button>
                        <Button onClick={onClose}>Close</Button>
                        <Button type='reset' onClick={handleReset}>Reset</Button>
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
    </Dialog>
}

export default UserForm