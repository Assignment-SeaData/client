import { useMemo } from 'react';
import { Country, City } from 'country-state-city';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function getAllCities(inputCountry) {
    const countryCode = Country.getAllCountries().find(country => country.name == inputCountry)?.isoCode;
    let citiesArr = [];
    if (countryCode) {
        citiesArr = City.getCitiesOfCountry(countryCode).reduce((acc, obj) => {
            return acc.some(item => item.name === obj.name) ? acc : [...acc, obj];
        }, []).map(city => ({ label: city.name }))
    }
    return citiesArr
}

const CitySelect = (props) => {

    const { defaultValue, onChange, inputCountry } = props

    const cities = useMemo(() => getAllCities(inputCountry), [inputCountry])

    return <Autocomplete
        options={cities}
        autoHighlight
        onChange={(event, newValue) => onChange(newValue?.label || '')}
        value={defaultValue}
        renderInput={(params) => <TextField {...params} label="City" required />}
    />
}

export default CitySelect