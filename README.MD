## Running the app
```bash
$ docker-compose up
```

## Stopping the app
```bash
$ docker-compose down -v
```

### Endpoints
```
 Requires: At least one CSV file having one column named "domain" mandatory
 Process: Checks Domains validity and existance
```
 - POST localhost:8080/upload
```
 Requires: Nothing
 Process: Loads all stored domain related data
```
 - GET localhost:8080/all
```
 Requires: Nothing
 Process: Loads all stored csv file names to allow serve static files 
```
 - GET localhost:8080/files
```
 Requires: Domain name Parameter
 Process: Fetches one record related with below ${domain name} from DB 
```
 - GET localhost:8080/by-name/${domain name}

```
 Requires: Nothing
 Process: Gains CSV file from store 
```
 - GET localhost:8080/${filename}

 ## Thanks :)