import AxiosInstance from "../cofig/axios.config";




const RestService={};


RestService.getProductItems=()=>{
    return AxiosInstance.get("/products/getProducts");
}


RestService.addProductItems=(payload)=>{
    return AxiosInstance.post('/products/addProduct',payload);
}

RestService.updateProductItems=(id,payload)=>{
    return AxiosInstance.put(`products/updateProduct/${id}`,payload)
}


RestService.deleteProductItems=(id)=>{
    console.log(id);
    return AxiosInstance.delete(`products/deleteProduct/${id}`);
}




export default RestService;