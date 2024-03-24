import { useEffect, useState } from "react";
import RestService from "../Services/Rest.service";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";


const InventoryScreen=()=>{

    

    const [products,setProducts] = useState([]);
    const [open, setOpen]=useState(false);
    const [thirdData, setThirdData]=useState(null);
    const [editFlag, setEditFlag]=useState(false);
    const [productDetails, setProductDetails]=useState({
        name:"",
        quantity:0,
        description:"",
        price:0,
        image:null
    })
    useEffect(()=>{
        getProductItems();
    },[]);


    const deleteProduct=(id)=>{
        RestService.deleteProductItems(id).then((resp)=>{
            let response=resp.data;
            if(response.status=="success"){
                alert("Product deleted successfully");
                getProductItems();
            }
        })
    }


    const addItem=()=>{
        console.log(productDetails);
        let productForm= new FormData();
        Object.keys(productDetails).forEach((item)=>{
            productForm.append(item, productDetails[item]);
        })
        RestService.addProductItems(productForm).then((response)=>{
            console.log(response)
            if(response.data.status=="success"){

                alert(response.data.message);
                setProductDetails({
                    name:"",
                    quantity:0,
                    description:"",
                    price:0,
                    image:null
                })
                setOpen(false);
                getProductItems();
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const getProductItems=()=>{
        RestService.getProductItems().then((response)=>{
            console.log(response)
            setProducts(response.data.products);
        },err=>{
            console.log(err);
        })
    }

    const updateProductDetails=()=>{
        
        
        let _id=productDetails._id;
        let image=productDetails.image;
        
        let productDetailsData=productDetails;
        delete productDetailsData._id;
        delete productDetailsData.images;
        let form=new FormData();
        Object.keys(productDetailsData).forEach((item)=>{
            form.append(item,productDetails[item]);
        })
        if(image){
            form.append( "imageInput", image );
        }
        console.log(_id)
        RestService.updateProductItems(_id, form).then((response)=>{
            console.log(response.data)
            let resp=response.data;
            if(resp.status=="success"){
                setOpen(false);
                setEditFlag(false);
                setProductDetails({
                    name:"",
                    quantity:0,
                    description:"",
                    price:0,
                    image:null
                });
                setEditFlag(false);
                alert("Updated Product successfully")
            }
        }).catch(err=>{
            console.log(err);

        })
    }


    return (
        <div className="container py-3">
            <br/>
            <button onClick={()=>setOpen(true)} className="btn btn-primary">Add Item</button>
            <table className="table w-100">
                <thead>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Product Image</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        console.log(item);
                        let imagePath="http://localhost:8080/assets/"+item.images
                        return  <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.description}</td>
                            <img style={{width:"100px", height:"100px"}} src={imagePath}></img>
                            <td>
                                <button onClick={()=>{
                                    setEditFlag(true);
                                    setProductDetails(item);
                                    setTimeout(()=> setOpen(true),500);
                               
                                }} className="btn btn-primary">Edit</button>
                                &nbsp;
                                <button onClick={()=>deleteProduct(item._id)} className="btn btn-primary">Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div
      className="modal show"
      style={{ display: open?"block":"none", position: 'fixed' }}
    >
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <br/>        
            <label>Name</label>
            <input type="text" onChange={(text)=>setProductDetails({...productDetails, name:text.target.value})} className="form-control" placeholder="Enter Name" value={productDetails.name}></input>
            <br/>
            <label>price</label>
            <input type="number" onChange={(text)=>setProductDetails({...productDetails, price:text.target.value})} className="form-control" placeholder="Enter price" value={String(productDetails.price)}></input>
            <br/>
            <label>Quantity</label>
            <input type="number" onChange={(text)=>setProductDetails({...productDetails, quantity:text.target.value})} className="form-control" placeholder="Enter Qunatity" value={String(productDetails.quantity)}></input>
            <br/>
            <label>Description</label>
            <textarea className="form-control" onChange={(text)=>setProductDetails({...productDetails, description:text.target.value})}  value={productDetails.description} placeholder="Enter Desctipion">{productDetails.description}</textarea>
            <br/>
            <label>Select Image</label>
            <input type="file" className="form-control" onChange={(text)=>setProductDetails({...productDetails, image:text.target.files[0]})} ></input>
            
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={()=>setOpen(false)} variant="secondary">Close</Button>
          {!editFlag?<Button  onClick={()=>{addItem()}} variant="primary">Add</Button>:<Button onClick={()=>{updateProductDetails()}}>Update</Button>}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
        </div>
    )
}





export default InventoryScreen;