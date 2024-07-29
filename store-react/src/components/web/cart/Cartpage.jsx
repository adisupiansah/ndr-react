import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { CartContext } from '../../../provider/context/CartProvider'
import {Rupiah} from "../../../utils/FormatRP/Rupiah"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Cartpage = () => {

  const {cartItems, tambahKuantitas, kurangKuantitas, clearCart, removeItem} = useContext(CartContext)

  const getTotalPerProduct = (item) => item.harga * item.quantity
  
  const totalAmount = cartItems.reduce((total, item) => total + getTotalPerProduct(item), 0);

  const getImage = (image) => {
    try {
      return new URL(`../../../assets/img/${image}`, import.meta.url).href;
    } catch (error) {
        return new URL (`../../../assets/img/default.png`);
    }
  }

  const hendleClearCart = () => {
    Swal.fire({
      title: "Anda yakin ingin menghapus semua barang?",
      text: "Data yang sudah dihapus akan hilang secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!"
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart()
      }
    });
  }

  const handleRemoveItem = (item) => {
    Swal.fire({
      title: "Anda yakin ingin menghapus barang ini?",
      text: "Data yang sudah dihapus akan hilang secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(item)
      }
    });
  }


  return (
    <div className="clas-cartpage">
    
        <Card className='cartpage-cardheader'>
            <Card.Body className='container'>
                <Card.Title>Keranjang belanja</Card.Title>
            </Card.Body>
        </Card>

        <Container>
          <Row>
             <Col>
                  <Card className='cartpage-cardmenu'>
                      <Card.Body className='cartpage-cardmenu-body d-flex justify-content-between align-items-center'>
                        <Col md={2}>
                          <Card.Text className='text-center'>Produk</Card.Text>
                        </Col>
                        <Col md={2} >
                          <Card.Text className='text-center'>Harga satuan</Card.Text>
                        </Col>
                        <Col md={2}>
                          <Card.Text className='text-center'>Kuantitas</Card.Text>
                        </Col>
                        <Col md={2}>
                          <Card.Text className='text-center'>Total harga</Card.Text>
                        </Col>
                        <Col md={3}>
                          <Card.Text className='text-center'>Remove</Card.Text>
                        </Col>
                         
                      </Card.Body>
                    </Card>            
             </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
              <Card className='cartpage-cardproduk'>
                {cartItems && cartItems.length === 0 ? (
                  <Card.Body>
                    <Card.Text className='text-center'>Keranjang masih kosong</Card.Text>
                  </Card.Body>
                ) : (
                  cartItems.map((item) => (
                    <Card.Body className='cartpage-cardproduk-body d-flex justify-content-between' key={item.id}>
                    <Col md={2} className='cartpage-cardproduk-body d-flex my-auto'>
                      <img src={getImage(item.image)} alt="" className='img-produk'/>
                      <Card.Text className='mx-auto my-auto col-md-6'>{item.type}</Card.Text>
                    </Col>
                    <Col md={2} className='my-auto'>
                      <Card.Text className='text-center'>Rp {Rupiah(item.harga)}</Card.Text>
                    </Col>
                    <Col md={2} className='my-auto'>
                      <div className="button-kuantitas d-flex justify-content-center align-items-center input-group">
                        <button className='btn btn-danger btn-kuantitas' onClick={() => kurangKuantitas(item.id)}>-</button>
                        <span className='mx-2'>{item.quantity}</span>
                        <button className='btn btn-success btn-kuantitas' onClick={() => tambahKuantitas(item.id)}>+</button>
                      </div>
                    </Col>
                    <Col md={2} className='my-auto'>
                      <Card.Text className='text-center'>Rp {Rupiah(getTotalPerProduct(item))}</Card.Text>
                    </Col>

                    <Col md={3} className='my-auto'>
                
                      <Card.Text className='text-center'>
                        <Button className='btn btn-sm btn-danger' onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                        </Card.Text>
                    </Col>
                  </Card.Body>
                  ))
                )}
                 
              </Card>
            </Col>
          </Row>
        </Container>

       
            <Card className='cartpage-cardcheckout fixed-bottom'>
              <Container>
                <Card.Body className='d-flex'>
            
                  <Col md={3} className='my-auto'>
                    <Card.Text className='text-center fw-bold'>Total Harga</Card.Text>
                  </Col>
                  <Col md={3} className='my-auto'>
                    <Card.Text className='text-center'>Rp {Rupiah(totalAmount)}</Card.Text>
                  </Col>
                  <Col md={3} className='my-auto'>
                    <Card.Text className='text-center'>
                       <Link to='/payment' state={{totalAmount}}>
                          <button className='btn btn-sm btn-success'>Checkout</button>
                        </Link>
                      </Card.Text>
                  </Col>
                  <Col md={3} className='my-auto'>
                     <Card.Text className='text-center'><button className='btn btn-sm btn-danger' onClick={hendleClearCart}>Clear Cart</button></Card.Text>
                  </Col>
             
                </Card.Body>
              </Container>
            </Card>
        
    </div>
  )
}

export default Cartpage
