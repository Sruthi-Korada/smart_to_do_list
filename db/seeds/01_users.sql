-- Users table seeds here (Example)
INSERT INTO users (email , password)
VALUES ('sruthikorada36@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('marta@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('users@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO categories ( type)
VALUES ('to read'),
('to watch'),
('to buy'),
('to eat');

INSERT INTO to_do_lists (user_id,input,category_id)
VALUES (1,'frozen',2),
      (2,'apple',3),
      (2,'cactusclub',4);
