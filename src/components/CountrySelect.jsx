import { Country } from 'country-state-city';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useMemo } from 'react';

function getAllCounties() {
    return Country.getAllCountries().map(country => ({ label: country.name, code: country.isoCode }))
}

const CountrySelect = (props) => {

    const { defaultValue, onChange } = props

    const countries = useMemo(() => getAllCounties(), [])

    return <Autocomplete
        options={countries}
        autoHighlight
        onChange={(event, newValue) => onChange(newValue?.label || '')}
        value={defaultValue}
        renderInput={(params) => <TextField {...params} label="Country" required />}
    />
}

export default CountrySelect