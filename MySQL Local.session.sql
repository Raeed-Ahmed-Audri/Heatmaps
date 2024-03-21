CREATE TABLE room_utilization (
  building VARCHAR(255),
  room_number VARCHAR(255),
  utilization_percent DECIMAL(10,2),
  PRIMARY KEY (building, room_number)
);

