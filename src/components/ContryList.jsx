import { useEffect, useState } from 'react';
import countryCodes from 'country-codes-list'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function getAllCountryObjects() {
    const allCountries = countryCodes.customList(`countryCode`, `{"label":"{countryNameEn}", "phone":"{countryCallingCode}"}`);
    const countryObjects = Object.entries(allCountries).map((key) => {
        const code = key[0];
        const labelPhoneObj = JSON.parse(key[1]);
        return {
            code: code,
            label: labelPhoneObj.label,
            phone: labelPhoneObj.phone,
        };
    });
    return countryObjects;
}

const CountrySelect = (props) => {

    const { onChange, defaultValue } = props

    console.log(defaultValue);

    const countryCodesObject = getAllCountryObjects();
    const [value, setValue] = useState({ phone: defaultValue || '' })

    return <Autocomplete
        options={countryCodesObject}
        autoHighlight
        onChange={(event, newValue) => {
            setValue(newValue == null ? '' : {...newValue, phone: `+${newValue.phone}`})
        }}
        value={value.phone ? `${value.phone}` : ''}
        renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                />
                {option.label} ({option.code}) +{option.phone}
            </Box>
        )}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Country code"
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                }}
            />
        )}
    />
}

export default CountrySelect