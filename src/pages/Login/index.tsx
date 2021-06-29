import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../providers/Auth";
import { Container } from "./styles";
import { useState } from "react";
import { useHistory } from "react-router-dom";

interface User {
  username: string;
  password: string;
}

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { signIn } = useAuth();

  const [error, setError] = useState(false);

  const history = useHistory();

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: User) => {
    signIn(data, setError, history);
    reset();
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          margin="normal"
          variant="outlined"
          label="Nome de usuário"
          size="small"
          color="primary"
          {...register("username")}
          error={!!errors.username}
          helperText={errors.username?.message}
        ></TextField>
      </div>
      <div>
        <TextField
          margin="normal"
          variant="outlined"
          label="Senha"
          type="password"
          size="small"
          color="primary"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        ></TextField>
      </div>
      <Button type="submit" variant="contained" color="primary" size="large">
        Entrar
      </Button>
    </Container>
  );
};

export default Login;
