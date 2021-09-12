/**
 * @format
 */

import {Platform, NativeModules} from 'react-native';
const Profile = NativeModules.FBProfile;

export type ProfileMap = {
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
 * Represents an immutable Facebook profile
 * This class provides a global "currentProfile" instance to more easily add social context to your application.
 */
class FBProfile {
  /**
   * The user id
   */
  userID: string | undefined;

  /**
   * The user's email.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'email' permission.
   */
  email: string | undefined;

  /**
   * The user's complete name
   */
  name: string | undefined;

  /**
   * The user's first name
   */
  firstName: string | undefined;

  /**
   * The user's last name
   */
  lastName: string | undefined;

  /**
   * The user's middle name
   */
  middleName: string | undefined;

  /**
   * A URL to the user's profile.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_link' permission
   */
  linkURL: string | undefined;

  /**
   * A URL to use for fetching a user's profile image.
   */
  imageURL: string | undefined;

  constructor(profileMap: ProfileMap) {
    this.firstName = profileMap.firstName;
    this.lastName = profileMap.lastName;
    this.middleName = profileMap.middleName;
    this.linkURL = profileMap.linkURL;
    this.imageURL = profileMap.imageURL;
    this.userID = profileMap.userID;
    // TODO: [TS Migration]: Value should be undefined. Discuss before merging.
    this.email = Platform.OS === 'android' ? null as unknown as undefined : profileMap.email;
    this.name = profileMap.name;
    Object.freeze(this);
  }

  /**
   * Getter the current logged profile
   */
  static getCurrentProfile(): Promise<FBProfile | null> {
    return new Promise((resolve) => {
      Profile.getCurrentProfile((profileMap: ProfileMap) => {
        if (profileMap) {
          resolve(new FBProfile(profileMap));
        } else {
          resolve(null);
        }
      });
    });
  }
}

export default FBProfile;
