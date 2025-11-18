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
      [name, description, image],
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { name, description, image } = data;

    return query(
      `UPDATE products
       SET name = $1,
           description = $2,
           image = $3
       WHERE id = $4`,
      [name, description, image, id]
    );
  }

  // [DELETE] Delete product
  static async delete(id) {
    try {
      const sql = 'DELETE FROM products WHERE id = $1 RETURNING *';
      const result = await query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // [DELETE] Soft Delete product
  async softDelete(id) {
    try {
      const sql = `
        UPDATE products 
        SET deleted_at = NOW() 
        WHERE id = $1 
        RETURNING *
      `;
      const result = await query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error soft deleting product:', error);
      throw error;
    }
  }

}

export default ProductModel;
