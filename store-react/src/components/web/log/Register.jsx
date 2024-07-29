import React, { useContext, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LoginContext } from '../../../provider/context/LoginProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {register} = useContext(LoginContext);

  // state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // navigate
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {

    e.preventDefault()
    try{
      await register (username, password)
      Swal.fire({
        title: "Berhasil",
        text: "Pendaftaran berhasil",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate('/login');
      });

    } catch (error) {
      console.error("erroro uy di Register.jsx" ,error)
    }
  }

  return (
    <div className='clas-register'>
      <Container>
        <Row className='d-flex justify-content-center align-items-center vh-100'>
          <Col>
            <Card>
              <Card.Body className='text-center py-5 px-5'>
                <div className="clas-logo-register">
                  <h3 className='text-success'>NDRSHOOP</h3>
                </div>
                <div className="clas-form-register py-3">
                    <form onSubmit={handleRegister}>
                        <div className="clas-input-register">
                          <input type="email" className='form-control' placeholder='Email'  onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="clas-input-password mt-3">
                          <input type="password" className='form-control' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className="clas-button-register">
                          <button className='btn btn-outline-primary mt-3 w-50'>Register</button>
                        </div>
                    </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
