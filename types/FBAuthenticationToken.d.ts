type AuthenticationTokenMap = {
  authenticationToken: string,
  nonce: string,
  graphDomain: string,
};
 
 /**
  * Represents an immutable access token for using Facebook services.
  */
 export class FBAuthenticationToken {
   
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

   constructor(tokenMap: AuthenticationTokenMap);
 
   /**
    * Getter for the authentication token
    */
   static getAuthenticationTokenIOS(): Promise<FBAuthenticationToken | null>;
 }
 

 