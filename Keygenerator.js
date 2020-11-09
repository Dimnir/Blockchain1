/*************************************************
Generate private key and public key using elliptic
--------------------------------------------------
both bitcoin and the ethereum are using secp256k1 

A ---> B
B -/-> A

*************************************************/

const EC = require('elliptic').ec 
const ec = new EC('secp256key1') // elliptic uses this

const key = ec.genKeyPair()

const publicKey = key.getPublic('hex') // public key
const privateKey = key.getPrivate('hex') // public key


