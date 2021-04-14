/**
 * @flow
 * @format
 */

 'use strict';

const { Platform, NativeModules } = require('react-native');
 const AuthenticationToken = NativeModules.FBAuthenticationToken;

 type AuthenticationTokenMap = {
   authenticationToken: string,
   nonce: string,
   graphDomain: string,
 };
 
 /**
  * Represents an immutable access token for using Facebook services.
  */
 class FBAuthenticationToken {
   
   /**
     The raw token string from the authentication response
    */
   authenticationToken: string;

   /**
     The nonce from the decoded authentication response
    */
   nonce: string;

   /**
    The graph domain where the user is authenticated.
   */
   graphDomain: string;
 
   constructor(tokenMap: AuthenticationTokenMap) {
     this.authenticationToken = tokenMap.authenticationToken;
     this.nonce = tokenMap.nonce;
     this.graphDomain = tokenMap.graphDomain;
     Object.freeze(this);
   }
 
   /**
    * Getter for the authentication token
    */
   static getAuthenticationToken(): Promise<?FBAuthenticationToken> {
     if (Platform.OS === 'android') {
       return;
      }
      return new Promise((resolve, reject) => {
       AuthenticationToken.getAuthenticationToken((tokenMap) => {
         if (tokenMap) {
            resolve(new FBAuthenticationToken(tokenMap));
          } else {
            resolve(null);
          }
        });
      });
    }
 }
 
 module.exports = FBAuthenticationToken;
 