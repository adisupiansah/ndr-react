import { Row, Col, Card } from "react-bootstrap";
import baju from "../../../assets/img/cart1.png";
import { useContext } from "react";
import { ProductContext } from "../../../provider/context/ProductProvider";
const Category = ({ onSelectedId }) => {
    const {products} = useContext(ProductContext)
    
  return (
    <div className="clas-category">
      <Row>
        <Col>
          <Card className="border-0 card-category shadow-sm ">
            <Card.Body>
              <Card.Title className="title-category">Category</Card.Title>
              <div className="tbl-category d-flex justify-content-between col-md-12 ">
                {Object.keys(products).map((productId) => (
                     <Card className="col-md-2 anakcard-category" key={productId} onClick={() => onSelectedId(productId)}>
                     <Card.Body>
                       <Card.Img variant="top" src={baju} />
                       <Card.Text className="text-center fs-5">
                         <span>{products[productId].nama_product}</span>
                       </Card.Text>
                     </Card.Body>
                   </Card>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Category;
