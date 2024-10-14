
export const initNotifications = async function () {
    const oldNotifications = [];
    try {
        // const checked = await checkAutharized('http://localhost:300/edit/product/inv', 'GET');

        // if (checked) {
        await fetch(`http://localhost:300/edit/product/inv`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                data.forEach(not => {
                    oldNotifications.push({
                        id: not._id,
                        serial: not.serial,
                        name: not.name,
                        price: not.price,
                        inv: not.inventory,
                        picname: not.picname,
                    })
                });
            });
        // } else {
        //     window.location.href = 'login.html';
        //     throw new Error('unautahraized');
        // }
    }
    catch (err) {
        throw (err);
    }
    return oldNotifications;
};


export const getProductData = async function (serial) {
    let product = {};
    try {
        // const autharized = await checkAutharized(`http://localhost:300/get/product/${serial}`, 'GET');
        // console.log(autharized);
        // if (autharized) {
        await fetch(`http://localhost:300/get/product/${serial}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {
                product.id = data._id;
                product.serial = data.serial;
                product.name = data.name;
                product.price = data.price;
                product.inv = data.inventory;
                product.exdate = data.expiredate;
                product.picname = data.picname;
            });
        // }
        // else {
        //     window.location.href = 'login.html';
        //     throw new Error('unauthorized');
        // }
    }
    catch (err) {
        err.message = 'Sorry this product not found (:';
        throw err;
    }

    return product;
};


export const getUsersInfo = async function () {
    try {
        let allUsersData = {};
        await fetch('http://localhost:300/get/users/info/all/users',
            {
                credentials: 'include',
                method: 'GET',
                headers: { 'Content-Type': 'applicarion/json' }
            }).then(res => res.json())
            .then(data => allUsersData = data);

        return allUsersData;
    } catch (err) {
        throw err;
    }
}


export let cart = [];
export const getCartList = async function (serial) {
    if (typeof (cart[cart.findIndex(pro => pro.serial === serial)]) !== 'undefined') {

        const currentProduct = cart[cart.findIndex(pro => pro.serial === serial)];
        // check invntory if 0 don't get product .
        currentProduct.amount++;
        currentProduct.sum = currentProduct.amount * currentProduct.price;

    } else {
        try {
            const product = await getProductData(serial);
            // check invntory if 0 don't get product .
            if (product.inv === 0) throw new Error('Less of inventory,check notifications');
            // console.log(product);
            product.amount = 1;
            product.sum = product.price * product.amount;
            // cart.push(new Product(product.id, product.serial, product.name, product.price, product.inv, product.picname));
            cart.push(product);
        } catch (err) {
            // console.log('error2 :', err);
            throw err;
        }
    }
}
export const clearCart = function () {
    // console.log('here in modal');
    cart = [];
}



export const saveCart = async function (cart1) {
    try {
        await fetch("http://localhost:300/save/cart", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                cart1
            )
        });

    }
    catch (err) {
        // console.log('error1 : ', err);
        throw err;
    }
}


const clearData = function (data) {
    const formdata = new FormData();

    formdata.append('serial', data.serial);
    formdata.append('name', data.name);
    formdata.append('price', data.price);
    formdata.append('inventory', data.inv);
    formdata.append('expiredate', data.exdate);
    formdata.append('pic', data.picname);

    console.log(formdata);

    return formdata;
}

export const addNewProduct = async function (newProduct) {
    try {
        // const result = await axios.post("http://localhost:300/add/product", clearData(newProduct));
        let result;
        await fetch(`http://localhost:300/add/product`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body:
                clearData(newProduct)
        })
            .then(res => {
                console.log(res.status);
                result = res
                return res;
            });

        console.log(result);
        if (result.status === 201) throw new Error('this product is alrady exist');
    }
    catch (err) {
        console.log('error1 : ', err.message);
        throw err;
    }

};


export const editProduct = async function (product) {
    try {
        // const result = await axios.post("http://localhost:300/edit/product", clearData(product));
        await fetch(`http://localhost:300/edit/product`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body:
                clearData(product)
        });
    }
    catch (err) {
        // console.log('error1 : ', err);
        throw err;
    }
}


export const deleteProduct = async function (serial) {
    try {

        await fetch(`http://localhost:300/delete/product/${serial}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'content-type': 'applications/json'
            }
        }).then(res => res.json());


    } catch (error) {
        throw error;
    }
}


const clearDataUser = function (data) {
    const formdata = new FormData();

    formdata.append('fname', data.fname);
    formdata.append('lname', data.lname);
    formdata.append('email', data.email);
    formdata.append('address', data.address);
    formdata.append('phone', data.phone);
    formdata.append('password', data.password);
    formdata.append('photo', data.photo);

    console.log(formdata);

    return formdata;
}


export const addNewUser = async function (newuser) {

    try {        // const result = await axios.post("http://localhost:300/add/new/user/newuser", clearData(newuser));
        await fetch(`http://localhost:300/add/new/user/newuser`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body:
                clearDataUser(newuser)
        });

    }
    catch (err) {
        throw err;
    }

};



export const getCartRecord = async function () {
    try {
        let data;
        // const authorized = await checkAutharized('http://localhost:300/get/cart/record', 'GET');
        // if (authorized) {

        await fetch(`http://localhost:300/get/cart/record`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data1 => data = data1);
        return data;
        // } else {
        window.location.href = 'login.html';
        throw new Error('unautahraized');
        // }
    } catch (err) {
        throw err;
    }
}


export const getProductDataById = async function (id) {
    let product = {};
    try {
        await fetch(`http://localhost:300/get/product/byid/${id}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                // console.log(data);
                // product = data;
                // console.log(data);
                product.id = data._id;
                product.serial = data.serial;
                product.name = data.name;
                product.price = data.price;
                product.inv = data.inventory;
                product.exdate = data.expiredate;
                product.picname = data.picname;
            });
        // console.log(product);
        return product;
    }
    catch (err) {
        // console.error(err);
        throw err;
    }

    return product;
}

export const destSession = async function () {
    await fetch(`http://localhost:300/destroy`, {
        credentials: 'include',
        method: 'GET',
    });
}


export const cartForDelevery = async function () {
    try {

        let carts = {};
        await fetch(`http://localhost:300/customer/get/dcart`, {
            credentials: 'include',
            method: 'GET'
        }).then(res => res.json())
            .then(data => carts = data);

        return carts;
    } catch (err) {
        throw err;
    }
}

export const productsCartforDelevery = async function (id) {
    try {
        let product = {};
        await fetch(`http://localhost:300/customer/get/product/${id}`, {
            credentials: 'include',
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                product.price = data.price;
                product.name = data.name;
            }
            );
        return product;
    } catch (err) {
        throw err;
    }
}

export const dropDelCart = async function (id) {
    try {
        let deletedCart = {};
        await fetch(`http://localhost:300/customer/drop/delcart/${id}`, {
            credentials: 'include',
            method: 'DELETE'
        }).then(res => res.json())
            .then(data => deletedCart = data);
    } catch (err) {
        throw err;
    }
}