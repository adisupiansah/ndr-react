import React, { useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import { ProductContext } from '../../../provider/context/ProductProvider'
import {CartContext} from "../../../provider/context/CartProvider"
import { Rupiah } from '../../../utils/FormatRP/Rupiah'
import Swal from 'sweetalert2'

const ProductDetail = () => {

    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const { addToCart} = useContext(CartContext);

    const product = Object.values(products).flatMap(category => Object.values(category.items)).find(item => item.id === id);

    if (!product) {
        return <div className='d-flex justify-content-center align-items-center vh-100'>Product not found</div>;
    }

    const getImage = (image) => {
        try {
          return new URL(`../../../assets/img/${image}`, import.meta.url).href;
        } catch (error) {
            return new URL (`../../../assets/img/default.png`);
        }
      }

      const handleToAddCart = (item) => {
        addToCart(item);
        Swal.fire({
          title: "Berhasil",
          text: "Barang ditambahkan ke keranjang",
          icon: "success",
          confirmButtonText: "OK",
        });
      };


  return (
    <div className="clas-productdetail d-flex justify-content-center align-items-center vh-100">
      <Container>
        <Row>
            <Col md={6} className='d-flex justify-content-center align-items-center'>
                <img src={getImage(product.image)} alt="" className='productdetail-img'/>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center'>
            <div className="product-detail d-flex flex-column justify-content-center align-items-start">
                <h2>{product.type}</h2>
                <p>Harga: Rp {Rupiah(product.harga)}</p>
                <p>Size: {product.size}</p>
                <p>Deskripsi: {product.deskripsi} </p>
                <p>Warna: {product.warna}</p>
                <div className="button-productdetail">
                    <Button variant="primary" size='sm' onClick={() => handleToAddCart(product)}>add cart</Button>
                </div>
            </div>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductDetail
