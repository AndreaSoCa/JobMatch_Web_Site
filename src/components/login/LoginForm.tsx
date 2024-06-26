import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Root } from "../materialUI-common";
import { LoginType, TLoginResponse } from "../../types";
import { useStyles } from "./LoginFormStyle";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from 'sonner'
import { useAuthActions } from "../../store/auth/useAuthActions";
import { login } from "../../services/auth-service";
import { useUserActions } from "../../store/user/useUserActions";
import { useAppSelector } from "../../hooks/store";

const LoginForm = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const { loginUserState } = useAuthActions();
  const { updateUser } = useUserActions();

  // #region Estado
  const [typeLogin, setTypeLogin] = useState<"user" | "worker" | "">('');

  const handleChangeTypeLogin = (event: SelectChangeEvent) => {
    setTypeLogin(event.target.value as "user" | "worker" | "");
  };
  // #endregion

  // #region React-hook-form y onSubmit 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      const response: TLoginResponse = await login(data, typeLogin);
      updateUser(response.user);
      loginUserState(response.token);
      if (typeLogin === 'user') {
        setTimeout(() => {
          navigate('/customer');
        }, 1000)
      } else if (typeLogin === 'worker') {
        setTimeout(() => {
          navigate('/worker');
        }, 1000)
      }
      toast.success("Acceso correcto");
    } catch (e) {
      toast.error("Acceso incorrecte, valide sus credenciales");
    }
  
  };
  // #endregion

  return (
    <Root>
      <Grid container component="main" sx={{ height: "100vh"}}>
        <Grid item xs={12} sm={12} md={12}
          sx={{display: 'flex', justifyContent: 'center',
            alignItems: 'center' }}>
          <Box
            sx={useStyles.form_container}
          >
            <img
              src="src/assets/tortuga.png"
              alt="Image description"
              style={{ width: '150px', height: '100px' }}
            />
            <Typography component="h1" variant="h5" sx={useStyles.title}>
              Come in and connect now
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    margin="normal"
                    type="text"
                    fullWidth
                    label="Email"
                    sx={{ mt: 2, mb: 1.5 }}
                    required
                    {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })}
                  />
                  {errors.email?.type === 'required' && <Typography sx={{color: 'black'}}>This field is required</Typography>}
                  {errors.email?.type === 'pattern' && <Typography sx={{color: 'black'}}>This field must be email format</Typography>}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    margin="normal"
                    type="password"
                    fullWidth
                    label="Password"
                    sx={{ mt: 1.5, mb: 1.5 }}
                    required
                    {...register("password", { required: true, minLength: 8 })}
                  />
                  {errors.password?.type === 'required' && <Typography sx={{color: 'black'}}>This field is required</Typography>}
                  {errors.password?.type === 'minLength' && <Typography sx={{color: 'black'}}>This field must be minimun 8 chars</Typography>}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="login-type-select">
                      Login type
                    </InputLabel>
                    <Select
                      labelId="login-type-select"
                      id="login-type-select"
                      label="Type of login"
                      value={typeLogin}
                      defaultValue="user"
                      onChange={handleChangeTypeLogin}
                    >
                      <MenuItem value={"user"}>User</MenuItem>
                      <MenuItem value={"worker"}>Worker</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                //disabled={!isValid}
              >
                Log in
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/register">You don't have an account? create one now</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Toaster />
      </Grid>
      
    </Root>
  );
};

export default LoginForm;
