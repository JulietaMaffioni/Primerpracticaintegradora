import fs from 'fs';

class ProductManager {
    #path;
    #format;

    constructor(path) {
        this.#path = path;
        this.#format = 'utf-8';
    }

    async #validateProduct(product) {
        const products = await this.getProducts();
        const duplicateProduct = products.find(item => item.code === product.code);
        
        if (duplicateProduct !== undefined) {
            throw new Error('A product with the same code already exists');
        }
        
        return true;
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.#path, this.#format);
            return JSON.parse(data);
        } catch (error) {
            throw new Error('Error: file not found');
        }
    }

    async #generateId() {
        const products = await this.getProducts();
        return products.length === 0 ? 1 : products[products.length - 1].id + 1;
    }

    async addProduct(title, description, price, thumbnail, code, category, stock) {
        const products = await this.getProducts();
        
        const newProduct = {
            id: await this.#generateId(),
            title,
            description,
            price,
            thumbnail: thumbnail || [],
            code,
            category,
            stock,
            status: true,
        }
        
        try {
            await this.#validateProduct(newProduct);
            products.push(newProduct);
            await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'));
            this.products = products;
            return newProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(item => item.id === id);
        return product;
    }

    async updateProduct(id, update) {
        const products = await this.getProducts();
        const index = products.findIndex(item => item.id === id);

        if (index !== -1) {
            try {
                await this.#validateProduct(update);
                products[index] = { ...products[index], ...update };
                await fs.promises.writeFile(this.#path, JSON.stringify(products, null, '\t'));
                this.products = products;
                return products[index];
            } catch (error) {
                throw new Error('Error updating: ' + error.message);
            }
        } else {
            throw new Error('Error updating: Product not found');
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const filterProducts = products.filter(item => item.id !== id);
            
            if (products.length !== filterProducts.length) {
                await fs.promises.writeFile(
                    this.#path,
                    JSON.stringify(filterProducts, null, '\t'),
                    this.#format
                );
                this.products = filterProducts;
                return 'Product successfully removed';
            }
            
            throw new Error('The product with that id does not exist');
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const productManager = new ProductManager('./src/api/products.json');
