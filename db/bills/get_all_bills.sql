select b.bill_id, b.name, b.cost, b.due_date, b.type
from users u 
join bill_list bl on bl.user_id = u.user_id
join bill b on b.bill_list_id = bl.bill_list_id
where u.user_id = ${userid};