
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Joe',password:"X1234"},
        {id: 2, username: 'Dan',password:"X2345"},
        {id: 3, username: 'Ash',password:"X3456"}
      ]);
    });
};
