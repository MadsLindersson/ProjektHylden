import db from './connection.js';

db.exec(`
    ----------------------------------------------------------------------
    -- CATEGORIES (Ensure these exist first to reference their IDs)
    ----------------------------------------------------------------------
    INSERT INTO categories (name) VALUES
    ('Photography'),
    ('Illustration'),
    ('Digital Art'),
    ('Graphic Design'),
    ('UI/UX'),
    ('Typography'),
    ('3D Art'),
    ('Animation'),
    ('Fine Art'),
    ('Crafts & DIY')
    ON CONFLICT(name) DO NOTHING; -- Prevents errors if the categories are already present

    ----------------------------------------------------------------------
    -- USERS (No change needed)
    ----------------------------------------------------------------------
    INSERT INTO users (username, email, password, profile_pic_url, bio, role)
    VALUES
    ('maxchen', 'max@example.com', 'password123', 'https://i.pravatar.cc/150?img=1', 'Photography enthusiast', 'user'),
    ('emilyjones', 'emily@example.com', 'password123', 'https://i.pravatar.cc/150?img=2', 'Digital artist', 'user'),
    ('lucasbrown', 'lucas@example.com', 'password123', 'https://i.pravatar.cc/150?img=3', 'Graphic designer', 'user'),
    ('admin', 'admin@example.com', 'adminpass', 'https://i.pravatar.cc/150?img=4', 'Site administrator', 'admin');

    ----------------------------------------------------------------------
    -- POSTS (UPDATED: Using subqueries to get category_id)
    ----------------------------------------------------------------------
    INSERT INTO posts (user_id, title, description, category_id, created_at)
    VALUES
    (1, 'Sunset Over City', 'Captured a beautiful sunset in the city skyline.', 
        (SELECT id FROM categories WHERE name = 'Photography'), datetime('now')),
        
    (2, 'Abstract Digital Art', 'Playing with shapes and colors.', 
        (SELECT id FROM categories WHERE name = 'Digital Art'), datetime('now')),
        
    (3, 'Logo Design Concepts', 'Some concepts for client logos.', 
        (SELECT id FROM categories WHERE name = 'Graphic Design'), datetime('now')),
        
    (1, 'Mountain Landscape', 'Hiking trip photos.', 
        (SELECT id FROM categories WHERE name = 'Photography'), datetime('now')),
        
    (2, 'Character Illustration', 'New character concept.', 
        (SELECT id FROM categories WHERE name = 'Illustration'), datetime('now')),
        
    (3, 'Typography Poster', 'Creative typography experiment.', 
        (SELECT id FROM categories WHERE name = 'Typography'), datetime('now')),
        
    (1, 'Forest Adventure', 'Nature photos from hiking.', 
        (SELECT id FROM categories WHERE name = 'Photography'), datetime('now')),
        
    (2, '3D Robot Model', 'First 3D model in Blender.', 
        (SELECT id FROM categories WHERE name = '3D Art'), datetime('now'));

    ----------------------------------------------------------------------
    -- POST IMAGES (No change needed)
    ----------------------------------------------------------------------
    INSERT INTO post_images (post_id, image_url, order_index)
    VALUES
    (1, 'https://picsum.photos/seed/101/600/400', 0),
    (1, 'https://picsum.photos/seed/102/600/400', 1),
    (2, 'https://picsum.photos/seed/201/600/400', 0),
    (3, 'https://picsum.photos/seed/301/600/400', 0),
    (4, 'https://picsum.photos/seed/401/600/400', 0),
    (5, 'https://picsum.photos/seed/501/600/400', 0),
    (6, 'https://picsum.photos/seed/601/600/400', 0),
    (7, 'https://picsum.photos/seed/701/600/400', 0),
    (8, 'https://picsum.photos/seed/801/600/400', 0);

    ----------------------------------------------------------------------
    -- COMMENTS (No change needed)
    ----------------------------------------------------------------------
    INSERT INTO comments (post_id, user_id, text, created_at)
    VALUES
    (1, 2, 'Amazing shot!', datetime('now')),
    (1, 3, 'I love the colors.', datetime('now')),
    (2, 1, 'This is so creative!', datetime('now')),
    (5, 3, 'Really nice illustration.', datetime('now')),
    (7, 2, 'Beautiful forest shots!', datetime('now'));

    ----------------------------------------------------------------------
    -- LIKES (No change needed)
    ----------------------------------------------------------------------
    INSERT INTO likes (post_id, user_id, created_at)
    VALUES
    (1, 2, datetime('now')),
    (1, 3, datetime('now')),
    (2, 1, datetime('now')),
    (3, 2, datetime('now')),
    (4, 1, datetime('now')),
    (5, 3, datetime('now')),
    (6, 1, datetime('now')),
    (7, 3, datetime('now')),
    (8, 2, datetime('now'));
`);