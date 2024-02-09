import countryCodes from 'country-codes-list'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useMemo } from 'react';

function getAllCountryObjects() {
    const allCountries = countryCodes.customList(`countryCode`, `{"label":"{countryNameEn}", "phone":"{countryCallingCode}"}`);
    const countryObjects = Object.entries(allCountries).map((key) => {
        const code = key[0];
        const labelPhoneObj = JSON.parse(key[1]);
        return {
            code: code,
            label: labelPhoneObj.label,
            phone: labelPhoneObj.phone.replace(' ', ''),
        };
    });
    return countryObjects;
}

const CountryCodeSelect = (props) => {

    const { onChange, defaultValue } = props

    const countryCodesObject = useMemo(() => getAllCountryObjects(), []);

    return <Autocomplete
        options={countryCodesObject}
        autoHighlight
        onChange={(event, newValue) => onChange(event, newValue?.phone || '')}
        value={defaultValue}
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
                defaultValue={defaultValue}
                {...params}
                label="Country code"
                inputProps={{
                    ...params.inputProps,
                }}
            />
        )}
    />
}

export default CountryCodeSelect