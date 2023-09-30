import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useCreateCMMutation } from "state/api";
import { useNavigate } from "react-router-dom";

const AddCm = () => {
  const isNoneMobile = useMediaQuery("(min-width:1000px)");
  const [createCM] = useCreateCMMutation();
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const theme = useTheme();

  const handleChange = (e) => {
    e.target.name === "name" && setName(e.target.value);
    e.target.name === "description" && setDescription(e.target.value);
    e.target.name === "department" && setDepartment(e.target.value);
  };

  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    createCM({ name, department, description });
    navigate("/CMs");
  };

  return (
    <Box
      m="3.5rem auto"
      p="2rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width={!isNoneMobile ? "100%" : "70%"}
      sx={{
        background: theme.palette.background.alt,
        color: theme.palette.primary[600],
      }}
    >
      <Header
        title="Add Maintenance Request"
        subtitle="Production Eng can Add Maintenance Request here"
      />
      <Box
        component="form"
        onSubmit={handelSubmit}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={!isNoneMobile ? "100%" : "90%"}
        height="100%"
        m="1.5rem auto"
        flexDirection="column"
      >
        <Stack spacing={5} width="80%">
          <TextField
            required
            label="Machine Name"
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
          />
          <TextField
            required
            label="Description"
            type="text"
            value={description}
            name="description"
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select
              required
              value={department}
              label="Department"
              onChange={handleChange}
              name="department"
            >
              <MenuItem value="Pretzel">Pretzel</MenuItem>
              <MenuItem value="Cigar">Cigar</MenuItem>
              <MenuItem value="Candy">Candy</MenuItem>
              <MenuItem value="Maamol">Maamol</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            color: theme.palette.secondary[100],
            background: theme.palette.primary[700],
            width: isNoneMobile ? "40%" : "50%",
            padding: "1rem",
            marginTop: "2rem",
          }}
        >
          Submit Order
        </Button>
      </Box>
    </Box>
  );
};

export default AddCm;
