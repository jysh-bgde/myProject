
import { Link } from "react-router-dom";

const Welcome = () => {

  return ( 
    <div className="container-fluid">
    <div className="night">
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
      <div className="shooting_star"></div>
    </div>
    <div className="row">
      <div className="col">
        <div className="d-grid gap-2 col-6 mx-auto">
          <h1 className="display-1  text-center">Welcome</h1>
          <Link to="/login" className="text-decoration-none btn btn-outline-success btn-lg fw-bold">Login</Link>
          <Link to="/register" className="text-decoration-none btn btn-outline-success btn-lg fw-bold">Register</Link>
        </div>
      </div>
    </div>
  </div>
   );
}
 
export default Welcome;