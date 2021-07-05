import AuthService from "./services/auth.service";
import { Redirect } from "react-router-dom";

const Logout = () => {
 
  AuthService.logout();
  return ( 
<div>
  You have logged out successfully.
<Redirect exact to ="/" />
</div>



   );
}
 
export default Logout;