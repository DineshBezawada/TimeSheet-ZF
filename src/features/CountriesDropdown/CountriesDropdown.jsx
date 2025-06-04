import React, { useState } from "react";

export const countryData = [
  {
    country: "India",
    states: [
      {
        state: "Andhra Pradesh",
        cities: ["Vizag", "Vijayawada"],
      },
      {
        state: "Telangana",
        cities: ["Hyderabad", "Warangal"],
      },
    ],
  },
  {
    country: "UK",
    states: [
      {
        state: "Manchester State",
        cities: ["Birmingham", "OldTrafford"],
      },
      {
        state: "Mercyside",
        cities: ["Liverpool", "Everton"],
      },
    ],
  },
];

const LocationSelector = () => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    // Reset state and city if country changes
    if (name === "country") {
      updatedData.state = "";
      updatedData.city = "";
    }

    // Reset city if state changes
    if (name === "state") {
      updatedData.city = "";
    }

    setFormData(updatedData);
  };

  const getStates = () => {
    const country = countryData.find((c) => c.country === formData.country);
    return country ? country.states : [];
  };

  const getCities = () => {
    const states = getStates();
    const state = states.find((s) => s.state === formData.state);
    return state ? state.cities : [];
  };

  return (
    <div>
      <h3>Select Country, State, City</h3>

      {/* Country Select */}
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        {countryData.map((c) => (
          <option key={c.country} value={c.country}>
            {c.country}
          </option>
        ))}
      </select>

      {/* State Select */}
      <select
        name="state"
        value={formData.state}
        onChange={handleChange}
        disabled={!formData.country}
      >
        <option value="">Select State</option>
        {getStates().map((s) => (
          <option key={s.state} value={s.state}>
            {s.state}
          </option>
        ))}
      </select>

      {/* City Select */}
      <select
        name="city"
        value={formData.city}
        onChange={handleChange}
        disabled={!formData.state}
      >
        <option value="">Select City</option>
        {getCities().map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
