import { useEffect, useState } from "react"
import Axios from "axios"
import Table from 'react-bootstrap/Table';
import "./Carts.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Carts() {
    let [cartProductIds, setCartProductIds] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            getUserCartData();
        }, 1000);
    }, [])

    let getUserCartData = async () => {
        let userlocal = JSON.parse(localStorage.getItem("user"));
        if (userlocal == null) {
            window.location = "/"
        }
        let cartData = await Axios.get("http://localhost:3000/cartData?userId=" + userlocal.id);
        console.log("first");

        // console.log(cartData);


        let newArray = []
        cartData.data.map((v, i) => {
            newArray.push(v.productId)
        })
        // console.log("hrd");

        // console.log(newArray);

        let allCartProductData = newArray.map((id) => Axios.get("https://fakestoreapi.com/products/" + id));
        let response = await Promise.all(allCartProductData)
        let result = response.map((res) => res.data);
        // console.log("gggggy");

        // console.log(result);
        result.map((v, i) => {
            v.cartQuantity = cartData.data[i].quantity,
                v.cartId = cartData.data[i].id
        })
        // console.log("ifff");
        // console.log(result);

        setCartProductIds(result)




    }

    return (
        <>
            {/* <Table align="center" striped bordered hover style={{textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Images</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qunatity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>

                    {cartProductIds.map((v, i) => {
                        return (

                            <tr>
                                <td>{++i}</td>
                                <td><img src={v.image} alt="" height={50} width={50}  /></td>
                                <td>{v.title}</td>
                                <td>{v.price}</td>
                                <td>{v.cartQuantity}</td>
                                <td>{v.price*v.cartQuantity}</td>
                                <td>x</td>
                                </tr>
                        )
                    })}
                </tbody>
            </Table> */}

            <Container style={{marginTop:'45px'}} >

<Col>
                {cartProductIds.map((v, i) => {
                    return (
                        <>
                        <div className="carts">

                        
                             <div className="carts-masin"  >
                                    <div className="cart-img" >
                                        <img src={v.image} alt="hyy" height={150} width={150} />
                                    </div>
                        
                                    <h4>{v.title}</h4>
                                    
                                    
                                </div>
                                <div>
                                    <div>{v.description}</div>
                                    </div>
                                    </div>
                        </>
                    )
                })}
</Col>


            </Container>






        </>
    )
}
export default Carts