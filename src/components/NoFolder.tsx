import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../routes/routes";

export function NoFolder() {
  return (
    <p>
      No folder selected, return to <Link to={ROUTE_PATHS.home()}>Home</Link> and select one.
    </p>
  );
}
