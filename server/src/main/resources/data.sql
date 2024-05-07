DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Best Seller'),('Young Adult'),('Fiction'),('Adult');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Steve Jobs', 'Walter Isaccson', 'Steve Jobs is the authorized self-titled biography of American business magnate and Apple co-founder Steve Jobs', 12.99, 5, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Alchemist', 'Paulo Coelho', 'The Alchemist is a novel by Brazilian author Paulo Coelho which was first published in 1988', 9.99, 5, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Atomic Habits', 'James Clear', 'Atomic Habits is the most comprehensive and practical guide on how to create good habits', 15.99, 5, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Intelligent Investor', 'Benjahim Graham', 'The Intelligent Investor by Benjamin Graham, is a widely acclaimed book on value investing. ', 10.99, 5, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Think and Grow Rich', 'Napolean Hill', 'Atomic Habits is the most comprehensive and practical guide on how to create good habits', 14.99, 5, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Power of Habit', 'Charles Duhigg', 'The Intelligent Investor by Benjamin Graham, is a widely acclaimed book on value investing. ', 11.99, 5, FALSE, FALSE, 1001);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('House in the Cerulean Sea', 'TJ Klune', 'The House in the Cerulean Sea is a contemporary fantasy novel by T.J. Klune', 12.59, 4, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Eragon', 'Christopher Paolini', 'Eragon is the first book in The Inheritance Cycle by American fantasy writer Christopher Paolini', 18.64, 4, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Hobbit', 'J. R. R. Tolkien', 'The Hobbit, or There and Back Again is a novel by the English author J. R. R. Tolkien', 9.9, 4, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Teenage Brain', 'Amy Ellis Nutt', 'A Neuroscientist''s Survival Guide to Raising Adolescents and Young Adults', 11.00, 4, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Infinity Alchemist', 'Kacen Callender', 'The Hobbit, or There and Back Again is a novel by the English author J. R. R. Tolkien', 17.99, 4, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Reckless', 'Lauren Roberts', 'A Neuroscientist''s Survival Guide to Raising Adolescents and Young Adults', 21.99, 4, FALSE, FALSE, 1002);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Table for Two', 'Amor Towles', 'Table for Two is Bre Graham''s book, showcasing recipes to cook for the people you love', 10.59, 4, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('In Sunshine or in Shadow', 'Clare Broyles', 'In Sunshine or in Shadow is an inspirational story of triumph over adversity', 10.99, 5, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Nightingale', 'Kristin Hannah', 'The Nightingale tells the stories of two sisters, separated by years and experience, by ideals, passion and circumstance', 11.99, 5, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Legacy of Mercy', 'Lynn Austin', 'A High-Society Chicago Historical Novel by Lynn Austin', 9.99, 4, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Storm We made', 'Vanessa Chan', 'The Hobbit, or There and Back Again is a novel by the English author J. R. R. Tolkien', 12.99, 4, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Come and Get It', 'Kiley Reid', 'A Neuroscientist''s Survival Guide to Raising Adolescents and Young Adults', 26.00, 4, FALSE, FALSE, 1003);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('How to Be an Adult in Relationships', 'David Richo', 'A book by David Richo that offers a fresh perspective on love and relationships',10.99, 5, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Is It You Me or Adult ADD', 'Gina Pera', 'A bestselling book that has helped thousands of readers understand how a highly variable syndrome affects them', 12.99, 4, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Lifeskills for Adult Children', 'Alan Garner', 'A book that describes how to Manage Money, Find a Job, Stay Fit, Eat Healthy and Live Independently', 14.99, 3, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Rules of Estrangement', 'Joshua Coleman', 'A guide for parents whose adult children have cut off contact that reveals the hidden logic of estrangement',15, 4, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Adult Drama', 'Natalie Beach', 'A book that describes how to Manage Money, Find a Job, Stay Fit, Eat Healthy and Live Independently', 27.99, 3, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('All Adults Here', 'Emma Straub', 'A guide for parents whose adult children have cut off contact that reveals the hidden logic of estrangement',15.49, 4, FALSE, FALSE, 1004);