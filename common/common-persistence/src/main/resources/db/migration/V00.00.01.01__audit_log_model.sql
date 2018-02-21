CREATE TABLE table_name
(
    column_1 INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    column_2 INT
);
CREATE UNIQUE INDEX table_name_column_1_uindex ON table_name (column_1);