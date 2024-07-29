import { Container } from "react-bootstrap";
import Gambar from "../../assets/img/noprofil.png"
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { useContext } from "react";
import { LoginContext} from "../../provider/context/LoginProvider"


const Header = () => {
  const {user} =useContext(LoginContext);

  return (
    <div className="clas-header">
      <Container>
        <div className="header d-flex justify-content-between align-items-center">
            <div className="header-socialmedia align-items-center d-flex justify-content-between gap-2">
             <span>ikuti kami</span>
              <FaInstagram className="header-socialmedia-icon"/>    
              <FaFacebook className="header-socialmedia-icon"/>
              <FaTiktok className="header-socialmedia-icon"/>
            </div>
          {
            <div className="header-akun">
                <span className="mx-2">{user.displayName || user.email}</span>
              {
              user.photoURL ?(
                <img src={user.photoURL} alt="" className="header-akun-img rounded-circle"/>
              ) : (
                <img src={Gambar} alt="" className="header-akun-img rounded-circle"/>
              )
                
              }
      
            </div>
          }
        </div>
      </Container>
    </div>
  );
};

export default Header;
