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
    -- USERS (Expanded with more Creators and Admins)
    ----------------------------------------------------------------------
    INSERT INTO users (username, email, password, profile_pic_url, bio, role)
    VALUES
    ('maxchen', 'max@example.com', 'password123', 'https://i.pravatar.cc/150?img=1', 'Photography enthusiast', 'creator'),
    ('emilyjones', 'emily@example.com', 'password123', 'https://i.pravatar.cc/150?img=2', 'Digital artist', 'creator'),
    ('lucasbrown', 'lucas@example.com', 'password123', 'https://i.pravatar.cc/150?img=3', 'Graphic designer', 'creator'),
    ('admin', 'admin@example.com', '$2b$14$724q9dZy43S35syp7pMAHeNPRer9V9DGEIAptp9NXS/5WB83HO4WC', 'https://i.pravatar.cc/150?img=4', 'Primary Site administrator', 'admin'),
    ('sarah_illustrates', 'sarah@example.com', 'password123', 'https://i.pravatar.cc/150?img=5', 'Freelance illustrator and coffee lover', 'creator'),
    ('dev_dave', 'dave@example.com', 'password123', 'https://i.pravatar.cc/150?img=6', 'Fullstack dev building creative tools', 'creator'),
    ('alex_renders', 'alex@example.com', 'password123', 'https://i.pravatar.cc/150?img=7', '3D Generalist exploring Octane', 'creator'),
    ('maya_pixels', 'maya@example.com', 'password123', 'https://i.pravatar.cc/150?img=8', 'Pixel art and game design', 'creator'),
    ('liam_frames', 'liam@example.com', 'password123', 'https://i.pravatar.cc/150?img=9', 'Motion graphics and short films', 'creator'),
    ('sophie_q', 'sophie@example.com', 'password123', 'https://i.pravatar.cc/150?img=10', 'UI/UX Designer at a tech startup', 'creator'),
    ('oliver_ink', 'oliver@example.com', 'password123', 'https://i.pravatar.cc/150?img=11', 'Traditional ink artist', 'creator'),
    ('bella_v', 'bella@example.com', 'password123', 'https://i.pravatar.cc/150?img=12', 'Fine art and oil painting', 'creator'),
    ('noah_type', 'noah@example.com', 'password123', 'https://i.pravatar.cc/150?img=13', 'Obsessed with custom lettering', 'creator'),
    ('admin_clara', 'clara_admin@example.com', 'password123', 'https://i.pravatar.cc/150?img=14', 'Community moderator', 'admin'),
    ('ethan_vfx', 'ethan@example.com', 'password123', 'https://i.pravatar.cc/150?img=15', 'VFX artist for indie games', 'creator'),
    ('chloe_crafts', 'chloe@example.com', 'password123', 'https://i.pravatar.cc/150?img=16', 'DIY and Paper-craft enthusiast', 'creator'),
    ('henry_shutter', 'henry@example.com', 'password123', 'https://i.pravatar.cc/150?img=17', 'Architectural photographer', 'creator'),
    ('grace_draws', 'grace@example.com', 'password123', 'https://i.pravatar.cc/150?img=18', 'Concept artist and world builder', 'creator'),
    ('admin_mike', 'mike_admin@example.com', 'password123', 'https://i.pravatar.cc/150?img=19', 'Technical support and Admin', 'admin'),
    ('zara_3d', 'zara@example.com', 'password123', 'https://i.pravatar.cc/150?img=20', 'Character modeling in ZBrush', 'creator');

    ----------------------------------------------------------------------
    -- POSTS (Fixed syntax: all in one INSERT statement)
    ----------------------------------------------------------------------
    INSERT INTO posts (user_id, title, description, category_id, created_at)
    VALUES
    (1, 'Sunset Over City', 'Beautiful sunset.', (SELECT id FROM categories WHERE name = 'Photography'), datetime('now')),
    (2, 'Abstract Digital Art', 'Shapes and colors.', (SELECT id FROM categories WHERE name = 'Digital Art'), datetime('now')),
    (3, 'Logo Concepts', 'Client logos.', (SELECT id FROM categories WHERE name = 'Graphic Design'), datetime('now')),
    (1, 'Mountain Landscape', 'Hiking trip.', (SELECT id FROM categories WHERE name = 'Photography'), datetime('now')),
    (2, 'Character Illustration', 'New concept.', (SELECT id FROM categories WHERE name = 'Illustration'), datetime('now')),
    (3, 'Typography Poster', 'Experiment.', (SELECT id FROM categories WHERE name = 'Typography'), datetime('now')),
    (1, 'Forest Adventure', 'Nature photos.', (SELECT id FROM categories WHERE name = 'Photography'), datetime('now')),
    (2, '3D Robot Model', 'Blender model.', (SELECT id FROM categories WHERE name = '3D Art'), datetime('now')),
    (5, 'Coffee & Ink', 'Morning sketches.', (SELECT id FROM categories WHERE name = 'Illustration'), datetime('now')),
    (7, 'Cyberpunk Street', 'Unreal Engine study.', (SELECT id FROM categories WHERE name = '3D Art'), datetime('now')),
    (10, 'Mobile Banking App', 'Fintech UI kit.', (SELECT id FROM categories WHERE name = 'UI/UX'), datetime('now')),
    (13, 'Hand Lettering Pack', 'Vector letters.', (SELECT id FROM categories WHERE name = 'Typography'), datetime('now')),
    (16, 'Origami Collection', 'Paper folds.', (SELECT id FROM categories WHERE name = 'Crafts & DIY'), datetime('now')),
    (18, 'Dragon Concept', 'Creature design.', (SELECT id FROM categories WHERE name = 'Illustration'), datetime('now'));

    ----------------------------------------------------------------------
    -- POST IMAGES
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
    (8, 'https://picsum.photos/seed/801/600/400', 0),
    (9, 'https://picsum.photos/seed/901/600/400', 0),
    (9, 'https://picsum.photos/seed/902/600/400', 1),
    (9, 'https://picsum.photos/seed/903/600/400', 2),
    (10, 'https://picsum.photos/seed/1001/600/400', 0),
    (10, 'https://picsum.photos/seed/1002/600/400', 1),
    (11, 'https://picsum.photos/seed/1101/600/400', 0),
    (12, 'https://picsum.photos/seed/1201/600/400', 0),
    (13, 'https://picsum.photos/seed/1301/600/400', 0),
    (14, 'https://picsum.photos/seed/1401/600/400', 0),
    (14, 'https://picsum.photos/seed/1402/600/400', 1),
    (14, 'https://picsum.photos/seed/1403/600/400', 2),
    (14, 'https://picsum.photos/seed/1404/600/400', 3);

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