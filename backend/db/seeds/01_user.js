
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'suny', email: 's@s.com'},
        {id: 2, name: 'qwe', email: 'q@q.com'},
        {id: 3, name: 'r', email: 'r@r.com'}
      ]);
    });
};
