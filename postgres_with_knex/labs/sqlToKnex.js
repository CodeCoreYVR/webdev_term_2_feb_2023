// [Lab] SQL to Knex 

// Write KnexJS that turns into the following SQL statements:
// 1) SELECT * FROM users WHERE id = '1';
knex.select('*')
  .from('users')
  .where('id', '=', '1');
// same as
knex('users')
  .where('id', '=', '1');
// same as
knex('users')
  .whereRaw('id = 1');

// 2) SELECT * FROM users LIMIT 5 OFFSET 10;
knex.select('*')
  .from('users')
  .limit(5)
  .offset(10);
// same as
knex('users')
  .limit(5)
  .offset(10);

// 3) INSERT INTO posts ('title') VALUES ('🤔');
knex('posts')
  .insert({title: '🤔'});

// 4) insert into `posts` (`content`, `title`) values ('🍎', '🍌'), ('✏️', '📄'), ('🖱, '⌨️');
knex('posts')
  .insert([
    {content: '🍎', title: '🍌'},
    {content: '✏️', title: '📄'},
    {content: '🖱', title: '⌨️'}
  ]);


