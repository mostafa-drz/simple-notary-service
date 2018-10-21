# Simple Notary Service

In this project you can submit a star info in a private blockchain.<br/>
Project inlcudes two basic functionality:

<ul>
<li>Submit a star info</li>
<li>Look up a star</li>
</ul>
To submit a star, first you have to verify your identity by signing a message in your wallet. You have only 5 minutes to complete a star submiting process (includes identity verification and submiting star info)
 
 ## Install the application
 Clone the repository by running ```git clone https://github.com/mostafa69d/simple-notary-service.git ``` and then in the root path of cloned respository run ```npm install``` to install the dependencies.

## Run the application

To run the application run `npm start`

## How application works?

### Submit a star

 <ol>
 <li>You have to request for wallet address verification by sending request to http://localhost:8000/requestValidation and in your body of your request you have to send the address of your wallet.
 example:<br/>
  {address:"kdnawidn39e29eu2jne219eue291ue0"}
 </li>
 <li>When you send the request for validation on the first step, you'll receive a response including a message that you have to sign in your wallet by the address you provided. After signing the message send the signature to the  http://localhost:8000/message-signature/validate. in the body of your request you have to provide the address and signature. Example:<br/>
 {
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "signature": "H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU="
}
<br/>
Remember, from the first step, you only have 5 minutes to finish the whole process. 
 </li>
 <li>if you are successful in verifying your wallet address, now you can submit a star by sending the star info to "http://localhost:8000/block". Example:<br/> 
 {
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "star": {
    "dec": "-26° 29'\\'' 24.9",
    "ra": "16h 29m 1.0s",
    "story": "Found star using https://www.google.com/sky/"
  }
 </li>
 </ol>

### Lookup

you can lookup by wallet address or block hash. For looking up by address send the request to http://localhost:8000/stars/address/:address
and to lookup by hash http://localhost:8000/stars/hash/:hash.
