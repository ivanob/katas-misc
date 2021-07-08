# katas-misc
Miscellaneous collection of small exercises, katas, snippets... in different languages

# How to run coin-exercise

Inside the directory run in a terminal `npm install` and then `npm run compile`. Server runs in `http://localhost:3000/v1`
The service responses /GET requests to the given endpoint, so:
### To query the CURRENT price of BTC:
```/GET localhost:3000/v1/```
### To query a HISTORICAL price of BTC:
```/GET localhost:3000/v1/?date=12-12-2019``` (This example queries the price that BTC had the 12th of December on 2019)
### This example queries the price that BTC had the 1st of June on 2020
```/GET localhost:3000/v1/?date=06-01-2020```

### Example of wrong queries that will not pass the validation:
- ```/GET localhost:3000/v1/?date=01-12-2005``` (BTC was not even created that date)
- ```/GET localhost:3000/v1/?date=01-12-2035``` ( This is quering a date in the future, that functionality is not available yet :) )


# Interesting resources
- https://medium.com/@tundebabzy/how-to-use-typescript-with-hapijs-c0d074e34321
- https://khalilstemmler.com/blogs/typescript/node-starter-project/
