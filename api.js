const URL_API = 'https://groceriesapi-31qn.onrender.com';

export const getProducts = async () => {
    try {
        const response = await fetch(URL_API + '/products');
        return await response.json();
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
};

export const deleteProduct = async (barcode) => {
    try {
        const response = await fetch(URL_API + '/products/' + barcode, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        throw error;
    }
};

export const insertProduct = async (product) => {
    try {
        const response = await fetch(URL_API + '/products', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        return await response.json();
    } catch (error) {
        console.error("Error al insertar producto:", error);
        throw error;
    }
};


export const updateProduct = async (barcode, product) => {
    try {
        const response = await fetch(URL_API + '/products/' + barcode, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        return await response.json();
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        throw error;
    }
};
