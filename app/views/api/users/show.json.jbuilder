
json.extract! @user, :id, :username, :email, :first_name, :last_name, :board_ids, :pin_ids
json.boards @user.boards
json.pins @user.pins
json.followers @user.followers
json.follows @user.follows