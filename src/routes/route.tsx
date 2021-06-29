import { Redirect, Route as ReactDOMRoute } from "react-router-dom";
import { useAuth } from "../providers/Auth";

interface Props {
  isPrivate?: boolean;
  component: () => JSX.Element;
  path: string;
  exact?: boolean;
}

const Route: React.FC<Props> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { token } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!token ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "/dashboard",
            }}
          />
        );
      }}
    />
  );
};

export default Route;
