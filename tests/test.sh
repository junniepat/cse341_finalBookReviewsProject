#!/usr/bin/env bash

# get reviews
curl localhost:8080/reviews
echo ''

# # create review
# curl localhost:8080/reviews \
#   --header "Content-Type: application/json" \
#   --request POST \
#   --data '{"username":"xyz","password":"xyz"}'
# echo ''

# get a single review
curl localhost:8080/review/62364d7aa570a466d9a201b3
echo ''

# delete a review bogus
curl localhost:8080/review/bogus \
  --request DELETE
echo ''

# delete a review
curl localhost:8080/review/62364d7aa570a466d9a201b3 \
  --request DELETE
echo ''
