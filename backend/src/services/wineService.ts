import db from "../config/ db";


export async function getWines(filter: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT mw.id, mw.name, mw.vintage, SUM(co.total_amount) as total_revenue,
             SUM(co.quantity) as total_bottles_sold, COUNT(co.id) as total_orders
      FROM master_wine mw
      JOIN wine_product wp ON wp.master_wine_id = mw.id
      JOIN customer_order co ON co.wine_product_id = wp.id
      WHERE co.status IN ('paid', 'dispatched')
      GROUP BY mw.id
      ORDER BY ${
        filter === 'revenue'
          ? 'total_revenue'
          : filter === 'bottles'
          ? 'total_bottles_sold'
          : 'total_orders'
      } DESC
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function searchWines(query: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const searchQuery = `%${query}%`;
    const queryText = `
      SELECT mw.id, mw.name, mw.vintage, SUM(co.total_amount) as total_revenue,
             SUM(co.quantity) as total_bottles_sold, COUNT(co.id) as total_orders
      FROM master_wine mw
      JOIN wine_product wp ON wp.master_wine_id = mw.id
      JOIN customer_order co ON co.wine_product_id = wp.id
      WHERE (mw.name LIKE ? OR mw.vintage LIKE ?)
      AND co.status IN ('paid', 'dispatched')
      GROUP BY mw.id
    `;

    db.all(queryText, [searchQuery, searchQuery], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
