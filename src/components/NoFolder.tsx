import { Link } from "react-router-dom";
import { routes } from "../routes/routes";

export function NoFolder() {
  return (
    <p>
      No folder selected, return to <Link to={routes.home}>Home</Link> and
      select one.
    </p>
  );
}
