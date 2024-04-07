import { SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Autocomplete, TextField } from "@mui/material";
import { NamedAPIResource } from "pokenode-ts";

type Dropdown = {
  items: NamedAPIResource[];
  selected?: NamedAPIResource | null;
  onChange?: (item: NamedAPIResource | null) => void;
};

const Dropdown = ({ items, onChange, selected }: Dropdown) => {
  const [value, setValue] = useState<string | null>(selected?.name || null);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    event.preventDefault();
    setValue(value);
    if (onChange) {
      onChange(items.find((item) => item.name === value) || null);
    }
  };

  return (
    <Box data-testid="dropdown">
      <FormControl sx={{ width: "240px" }}>
        <Autocomplete
          value={value}
          onChange={handleChange}
          options={items.map((item) => item.name)}
          renderInput={(params) => <TextField {...params} label="Type" />}
        />
      </FormControl>
    </Box>
  );
};

export default Dropdown;
