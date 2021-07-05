import { Link } from "react-router-dom";
import AuthService from "./services/auth.service";

const NotFound = () => {

    const currentUser = AuthService.getCurrentUser();
    return (
        <div className="not-found">
            <h2>ERROR</h2>
        <p>{currentUser}</p>
        <Link to="/">Back to the homepage</Link>
        </div>
      );
}
 
export default NotFound;