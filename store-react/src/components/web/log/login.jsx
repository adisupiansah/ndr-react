import { Container, Row, Col, Card} from 'react-bootstrap'
import { FcGoogle } from "react-icons/fc";
import { LoginContext } from '../../../provider/context/LoginProvider';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const login = () => {
  // provider login dan loginWithGoogle
  const {login, loginWithGoogle} = useContext(LoginContext)

  // state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')

    }
    catch (error) {
      setError("login gagal")
    }
  }

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault()
    try {
      await loginWithGoogle()
      navigate('/')
    }
    catch (error) {
      setError("login google gagal")
    }
  }

  return (
    <div className='clas-login'>
      <Container>
        <Row className='d-flex justify-content-center align-items-center vh-100'>
            <Col md={6} lg={5} sm={8}>
                <Card className='shadow border-0'>
                    <Card.Body className='text-center py-5 px-5'>
                      <div className="clas-judul-card">
                        <h3 className='text-success py-4'>NDRSHOOP</h3>
                      </div>
                      {/* pesan error */}
                      {error && <div className='alert alert-danger'>{error}</div>}
                      <form onSubmit={handleLogin}>
                        <div className="clas-input-username">
                          <input type="text" className='form-control' placeholder='Username' onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="clas-input-password mt-4">
                          <input type="password" className='form-control' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="clas-input-button">
                          <button type="submit" className='btn btn-primary w-50 mt-4'>Login</button>
                        </div>
                        <div className="clas-loginwith mt-4">
                          <span>or login with</span>
                        </div>
                        <div className="clas-loginwith-google">
                          <button className='btn btn-secondary mt-4' onClick={handleLoginWithGoogle}><FcGoogle />Google</button>
                        </div>
                      </form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default login
