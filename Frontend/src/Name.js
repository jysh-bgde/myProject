import { Link} from 'react-router-dom';

const Name = () => {
    return (
       <div className="websiteName d-flex justify-content-around ">
           <Link to="/users/home" className="text-white text-decoration-none">WebsiteName</Link>
           
             <a href="#a" className=" text-white text-decoration-none" type="button">DarkMode</a>
       </div>
      );
}
 
export default Name ;