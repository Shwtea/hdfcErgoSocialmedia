# hdfcErgoSocialmedia
1. create user: creating a user
api name: /user
method: POST
2. get user information: user information with the role infomation(use mongodb
aggregation to get the information)
api name: user/:user_id
method: GET
2. create post: creating a post
api name: /:user_id/post
method: POST
3. edit post: editing a post
api_name: post/:post_id
method: PUT
4. delete post: deleting a post
api name: post/:post_id
method: DELETE
5. get all post by user id
api name: /post/:user_id
method: GET
