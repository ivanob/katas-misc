 # Motivation
 This is an exercise to implement a jwt authentication between client and server.

 - Authenticating is the process of verifying that the user is who they claim to be.
 - Authorising is, once the user is authenticated, tells us which operations they can perform and which they can not.

 JWT is a static way of authenticating + authorising users to perform some actions over specific endpoints.

 The client connects to an authorisating server that takes the username and password and creates a JWT token signed with a secret key. The client receives this token and stores it securely to send it alond future requests so the server can take that encoded token and verify it is genuine. Note that the client is not signing anything (and he does not know the key that the server is using), so the moment that the JWT signed token gets compromised then the identity of that user can be stolen.

I am going to use Bearer tokens in this snippet (https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
 
This project uses the extension 'REST Client' from VSCode to execute the *.rest files

 Documentaton used:
 - https://jwt.io/
 - https://www.robinwieruch.de/node-js-express-tutorial/
 - https://stackabuse.com/building-a-rest-api-with-node-and-express/
 - https://www.youtube.com/watch?v=btW1SefZf9M&t=2400s&ab_channel=midudev
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 - https://stackoverflow.com/questions/3825990/
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 - http-response-code-for-post-when-resource-already-exists
 - https://www.bugsnag.com/blog/anatomy-of-a-javascript-error
 - https://bobbyhadz.com/blog/javascript-error-cannot-set-headers-after-they-are-sent-to-client