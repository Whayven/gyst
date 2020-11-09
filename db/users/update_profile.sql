update users
set income = ${income},
  name = ${userName}
where user_id = ${userid};

select income, name
from users where user_id = ${userid};