import { query } from '../../config/db.js';

class ProductModel {
  // get all products
  static async findAll() {
    const result = await query('SELECT * FROM products WHERE "deletedAt" IS NULL ORDER BY id');
    return result.rows;
  }

  // get product by id
  static async findById(id) {
    const result = await query('SELECT * FROM products WHERE id = $1 AND "deletedAt" IS NULL', [id]);
    return result.rows[0];
  }

  static async findByIdWithDeleted(id) {
    const result = await query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
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
       WHERE id = $4 AND "deletedAt" IS NULL`,
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
  static async softDelete(id) {
    try {
      const sql = `
        UPDATE products 
        SET "deletedAt" = NOW() 
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

  // [GET] /me/trash/products
  static async findAllWithDeleted() {
    const result = await query('SELECT * FROM products WHERE "deletedAt" IS NOT NULL ORDER BY id');
    return result.rows;
  }

  // [PATCH] /product/:id/restore
  static async restore(id) {
    try {
      const sql = `
        UPDATE products
        SET "deletedAt" = NULL 
        WHERE id = $1
        RETURNING *
      `;
      const result = await query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error restoring product:', error);
      throw error;
    }
  }


}

export default ProductModel;
