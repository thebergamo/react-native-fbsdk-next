/**
 * @flow
 * @format
 */

 'use strict';

const { Platform, NativeModules } = require('react-native');
  const Profile = NativeModules.FBProfile;

  type ProfileMap = {
    firstName: string,
    lastName: string,
    middleName: string,
    imageURL: string,
    linkURL: string,
    userID: string,
    email: string,
    name: string,
  };
 
/**
* Rappresent the current profile logged
*/
class FBProfile {
  
  /**
   * The user id
   */
  userID: string;

  /**
   * The user's email.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'email' permission.
   */
  email: string;

  /**
   * The user's complete name
   */
  name: string;

  /**
   * The user's first name
   */
  firstName: string;

  /**
   * The user's last name
   */
  lastName: string;

  /**
   * The user's middle name
   */
  middleName: string;

  /**
   * A URL to the user's profile.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_link' permission
   */
  linkURL: string;

  /**
   * A URL to use for fetching a user's profile image.
   */
  imageURL: string;

  constructor(profileMap: ProfileMap) {
    this.firstName = profileMap.firstName;
    this.lastName = profileMap.lastName;
    this.middleName = profileMap.middleName;
    this.linkURL = profileMap.linkURL;
    this.imageURL = profileMap.imageURL;
    this.userID = profileMap.userID;
    this.email = profileMap.email;
    this.name = profileMap.name;
    Object.freeze(this);
  }

  /**
  * Getter the current logged profile
  */
  static getCurrentProfile(): Promise<?FBProfile> {
    if (Platform.OS === 'android') {
      // TODO: Not implemented in Android yet
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      Profile.getCurrentProfile((profileMap) => {
        if (profileMap) {
          resolve(new FBProfile(profileMap));
        } else {
          resolve(null);
        }
      });
    });
  }
}
 
 module.exports = FBProfile;
 