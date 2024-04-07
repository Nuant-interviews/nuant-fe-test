import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

function Search({ value, onChange }: Props) {
  return (
    <TextField
      sx={{ width: "200px" }}
      placeholder="Filter by name..."
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export default Search;
