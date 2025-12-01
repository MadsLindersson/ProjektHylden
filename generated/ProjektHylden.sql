CREATE TABLE User (
	id VARCHAR(255) NOT NULL,	-- added default type
	username VARCHAR(255) NOT NULL,	-- added default type
	email VARCHAR(255) NOT NULL,	-- added default type
	password VARCHAR(255) NOT NULL,	-- added default type
	profile_pic VARCHAR(255) NOT NULL,	-- added default type
	bio VARCHAR(255) NOT NULL,	-- added default type
	role VARCHAR(255) NOT NULL,	-- added default type
	PRIMARY KEY (id)
);
CREATE TABLE Post (
	id VARCHAR(255) NOT NULL,	-- added default type
	userId VARCHAR(255) NOT NULL,	-- added default type
	title VARCHAR(255) NOT NULL,	-- added default type
	description VARCHAR(255) NOT NULL,	-- added default type
	category VARCHAR(255) NOT NULL,	-- added default type
	createdAt VARCHAR(255) NOT NULL,	-- added default type
	updatedAt VARCHAR(255) NOT NULL,	-- added default type
	PRIMARY KEY (id)
);
CREATE TABLE PostImage (
	id VARCHAR(255) NOT NULL,	-- added default type
	postId VARCHAR(255) NOT NULL,	-- added default type
	imageUrl VARCHAR(255) NOT NULL,	-- added default type
	PRIMARY KEY (id)
);
CREATE TABLE Comment (
	id VARCHAR(255) NOT NULL,	-- added default type
	postId VARCHAR(255) NOT NULL,	-- added default type
	text VARCHAR(255) NOT NULL,	-- added default type
	createdAt VARCHAR(255) NOT NULL,	-- added default type
	PRIMARY KEY (id)
);
CREATE TABLE Like (
	id VARCHAR(255) NOT NULL,	-- added default type
	postId VARCHAR(255) NOT NULL,	-- added default type
	createdAt VARCHAR(255) NOT NULL,	-- added default type
	PRIMARY KEY (id)
);
CREATE TABLE UserPosts (
	id VARCHAR(255) NOT NULL,	-- added default type
	id2 VARCHAR(255) NOT NULL,	-- renamed from: id; added default type
	PRIMARY KEY (id, id2),
	FOREIGN KEY (id) REFERENCES User (id) ON DELETE CASCADE,
	FOREIGN KEY (id2) REFERENCES Post (id) ON DELETE CASCADE
);
CREATE TABLE PostComments (
	id VARCHAR(255) NOT NULL,	-- added default type
	id2 VARCHAR(255) NOT NULL,	-- renamed from: id; added default type
	PRIMARY KEY (id, id2),
	FOREIGN KEY (id) REFERENCES Post (id) ON DELETE CASCADE,
	FOREIGN KEY (id2) REFERENCES Comment (id) ON DELETE CASCADE
);
CREATE TABLE PostLikes (
	id VARCHAR(255) NOT NULL,	-- added default type
	id2 VARCHAR(255) NOT NULL,	-- renamed from: id; added default type
	PRIMARY KEY (id, id2),
	FOREIGN KEY (id) REFERENCES Post (id) ON DELETE CASCADE,
	FOREIGN KEY (id2) REFERENCES Like (id) ON DELETE CASCADE
);
CREATE TABLE PostImages (
	id VARCHAR(255) NOT NULL,	-- added default type
	id2 VARCHAR(255) NOT NULL,	-- renamed from: id; added default type
	PRIMARY KEY (id, id2),
	FOREIGN KEY (id) REFERENCES Post (id) ON DELETE CASCADE,
	FOREIGN KEY (id2) REFERENCES PostImage (id) ON DELETE CASCADE
);
