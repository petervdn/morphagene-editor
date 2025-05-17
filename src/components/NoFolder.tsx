import { Link } from "react-router-dom";

export function NoFolder() {
  return (
    <p>
      No folder selected, return to <Link to="/">Home</Link> and select one.
    </p>
  );
}
