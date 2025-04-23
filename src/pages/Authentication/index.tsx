import React from "react";
import { SignIn, SignUp } from "@clerk/react-router";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function AuthenticationPage() {
  // const [value, setValue] = React.useState("signIn");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorCredentials, setErrorCredentials] = React.useState("");
  const navigate = useNavigate();

  const onConfirmHandler = () => {
    if (username === "" && password === "") {
      setErrorCredentials("Veuillez remplir les champs obligatoires!");
    } else if (username === "admin" && password === "admin") {
      navigate("/dashboard");
    } else {
      setErrorCredentials(
        "Le nom d'utilisateur ou le mot de passe est incorrect!"
      );
    }
  };

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };
  return (
    // <Box>
    //   <TabContext value={value}>
    //     <Box>
    //       <TabList centered onChange={handleChange}>
    //         <Tab label="Connectez-vous" value="signIn" />
    //         <Tab label="S'inscrire" value="signUp" />
    //       </TabList>
    //     </Box>
    //     <TabPanel value="signIn" className="flex justify-center">
    //       <SignIn
    //         appearance={{
    //           elements: {
    //             footer: {
    //               display: "none",
    //             },
    //           },
    //         }}
    //       />
    //     </TabPanel>
    //     <TabPanel value="signUp" className="flex justify-center">
    //       <SignUp
    //         appearance={{
    //           elements: {
    //             footer: {
    //               display: "none",
    //             },
    //           },
    //         }}
    //       />
    //     </TabPanel>
    //   </TabContext>
    // </Box>
    <div className="flex h-dvh justify-center items-center">
      <div className="w-1/4 border px-4 pt-2 pb-4 rounded-2xl">
        <div>
          <TextField
            fullWidth
            id={"username"}
            label={"Nom d'utilisateur"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            helperText={"Veuillez saisir votre nom d'utilisateur!"}
            margin="normal"
          />
        </div>
        <div>
          <TextField
            fullWidth
            type="password"
            id={"password"}
            label={"Mot de passe"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText={"Veuillez saisir votre mot de passe!"}
            margin="normal"
          />
        </div>
        <div>
          <Typography textAlign="justify" color="error" variant="caption">
            {errorCredentials}
          </Typography>
        </div>
        <div>
          <Button variant="contained" onClick={onConfirmHandler}>
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  );
}
