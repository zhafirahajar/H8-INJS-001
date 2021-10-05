ALTER TABLE "order_barang"
DROP COLUMN "id_barang"

ALTER TABLE "order_barang"
RENAME TO order_customer

ALTER TABLE "orders"
DROP COLUMN id_user

ALTER TABLE "orders"
ADD COLUMN id_barang INTEGER 

ALTER TABLE "orders"
ADD CONSTRAINT order_barang
	FOREIGN KEY ("id_barang")
	REFERENCES barang(id_barang)
	ON DELETE CASCADE
	
ALTER TABLE "order_customer"
ADD COLUMN order_customer_pk SERIAL PRIMARY KEY

	
INSERT INTO orders (id_barang)
VALUES
	(1),
	(2)
	
INSERT INTO order_customer (id_order, id_user, total_harga)
VALUES
	(6,4,100000),
	(7,5,400000)
	
SELECT * FROM order_customer
WHERE total_harga > 100000

UPDATE order_customer
	SET id_user = 6
WHERE id_user = 5
RETURNING *

DELETE FROM order_customer 
WHERE id_order = 9 