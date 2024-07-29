import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { Rupiah } from "../../../../utils/FormatRP/Rupiah";
import axios from "axios"

const paymentForm = () => {
    const [name, setName] = useState('');
    const [orderId, setOrderId] = useState('');
    
    const location = useLocation()
    const {totalAmount} = location.state || {totalAmount:0}

    // state token
    const [token, setToken] = useState('');

    const handleProsess = async (e) => {
        e.preventDefault()
        const data = {
            name: name,
            orderId: orderId,
            totalAmount: totalAmount
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const response = await axios.post('http://localhost:5000/api/payment/process-transaction', data, config)

            setToken(response.data.token)
        } catch (error) {
            console.error("anak anjeng", error);
        }
    }

    useEffect(() => {
        if (token) {
            window.snap.pay(token, {
                onSuccess: (result) => {
                    localStorage.setItem("Pembayaran", JSON.stringify(result))
                    setToken("");
                },
                onPending: (result) => {
                    localStorage.setItem("Pembayaran", JSON.stringify(result))
                    setToken("");
                }, 
                onError: (error) => {
                    console.log("ada error di useEffect",error)
                    setToken("");
                },
                onClose: () => {
                    console.log("anda belum menyelesaikan pembayaran");
                    setToken("");
                }
            })
            setName("");
            setOrderId("");
        }
    }, [token]);

    useEffect(() => {
        const urlMidtrans = 'https://app.sandbox.midtrans.com/snap/snap.js';

        let scriptTag = document.createElement('script');
        scriptTag.src = urlMidtrans;

        const midtransClientKey = 'SB-Mid-client-eDfsQTa-YuStaNqi'
        scriptTag.setAttribute('data-client-key', midtransClientKey);

        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        }

    }, [])


  return (
    <div className="clas-paymentForm">
        <Container>
            <Row className='d-flex justify-content-center align-items-center vh-100'>
                <Col md={6} sm={12}>
                    <Form onSubmit={handleProsess}>
                        <Form.Group>
                           <Form.Label>Nama</Form.Label>
                           <Form.Control type="text" placeholder="Nama..." className="mb-3" onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                           <Form.Label>id</Form.Label>
                           <Form.Control type="number" placeholder="id" onChange={(e) => setOrderId(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                           <Form.Label>Total</Form.Label>
                           <Form.Control type="number" placeholder="total" value={Rupiah(totalAmount)} readOnly/>
                        </Form.Group>
                        <div className="btn-form d-flex justify-content-center align-items-center mt-3">
                            <Button variant="primary" size='sm' type="submit" className="w-50">
                                send
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default paymentForm;
