
# Express Bull Sample

## Install

### Clone the repository
```bash 
$ git clone https://github.com/ranggadarmajati/express-bull-sample.git
```
### Go to project directory & Install dependencies
```bash
$ cd express-bull-sample && npm install
```
### Copy .env file & set env file
```bash
$ cp .env.example .env
```
### Running project
```bash
$ npm run start
```
### Running wokers on another terminal
```bash
$ npm run worker-start
```
go to url  [localhost:3000/healthcheck](localhost:3000/healthcheck) and go to url [localhost:4567](localhost:4567) to see queue monitor
###
## Usage/Examples

```curl
$ curl --location 'http://127.0.0.1:3000/api/v1/orders' \
--header 'Content-Type: application/json' \
--data '{
    "product": "Testing5",
    "product_id": 5,
    "quantity": 1
}'
{"status":true,"code":200,"message":"Order created successfully","data":{"product":"Testing5","product_id":5,"quantity":1}}
```
### Notes:
- On your local computer you must have Redis installed and make sure the Redis service is turned on