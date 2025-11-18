import { query } from '../../config/db.js';

class ProductModel {
    // get all products
    static async findAll() {
        const result = await query('SELECT * FROM products ORDER BY id');
        return result.rows;
    }

    // get product by id
    static async findById(id) {
        const result = await query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    }

    // create new product
    static async create({ name, description, image }) {
        const result = await query(
      `INSERT INTO products (name, description, image)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, description, image]
    );
    return result.rows[0];
    }

}

export default ProductModel;