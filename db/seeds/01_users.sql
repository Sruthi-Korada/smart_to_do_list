-- Users table seeds here (Example)
INSERT INTO users (id, email , password) 
VALUES (1,'sruthikorada36@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2,'marta@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3,'users@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO categories (id, type)
VALUES (1, 'to read'),
(2, 'to watch'),
(3, 'to buy'),
(4, 'to eat');

INSERT INTO to_do_lists (id,user_id,category_id)
VALUES (1,1,3),
      (2,2,1),
      (3,2,4);