/**
 * @format
 */
import {Platform, NativeModules} from 'react-native';

const Profile = NativeModules.FBProfile;

export type ProfileMap = {
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  imageURL?: string | null;
  linkURL?: string | null;
  userID?: string | null;
  email?: string | null;
  name?: string | null;
  refreshDate?: number | null;
  friendIDs?: Array<string> | null;
  birthday?: number | null;
  ageRange?: {min: number; max: number} | null;
  hometown?: {id: string; name: string} | null;
  location?: {id: string; name: string} | null;
  gender?: string | null;
  permissions?: Array<string> | null;
};

/**
 * Represents an immutable Facebook profile
 * This class provides a global "currentProfile" instance to more easily add social context to your application.
 */
class FBProfile {
  /**
   * The user id
   */
  userID?: string | null;

  /**
   * The user's email.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'email' permission.
   */
  email?: string | null;

  /**
   * The user's complete name
   */
  name?: string | null;

  /**
   * The user's first name
   */
  firstName?: string | null;

  /**
   * The user's last name
   */
  lastName?: string | null;

  /**
   * The user's middle name
   */
  middleName?: string | null;

  /**
   * A URL to the user's profile.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_link' permission
   */
  linkURL?: string | null;

  /**
   * A URL to use for fetching a user's profile image.
   */
  imageURL?: string | null;

  /**
   * The last time the profile data was fetched.
   */
  refreshDate?: Date | null;

  /**
   * A list of identifiers of the user’s friends.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_friends' permission and
   * limited login flow is used on iOS
   */
  friendIDs?: Array<string> | null;

  /**
   * The user’s birthday.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_birthday' permission and
   * limited login flow is used on iOS
   */
  birthday?: Date | null;

  /**
   * The user’s age range.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_age_range' permission and
   * limited login flow is used on iOS
   */
  ageRange?: {min: number; max: number} | null;

  /**
   * The user’s hometown.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_hometown' permission and
   * limited login flow is used on iOS
   */
  hometown?: {id: string; name: string} | null;

  /**
   * The user’s location.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_location' permission and
   * limited login flow is used on iOS
   */
  location?: {id: string; name: string} | null;

  /**
   * The user’s gender.
   * IMPORTANT: This field will only be populated if your user has granted your application the 'user_gender' permission and
   * limited login flow is used on iOS
   */
  gender?: string | null;

  /**
   * The user’s granted permissions.
   */
  permissions?: Array<string> | null;

  constructor(profileMap: ProfileMap) {
    this.firstName = profileMap.firstName;
    this.lastName = profileMap.lastName;
    this.middleName = profileMap.middleName;
    this.linkURL = profileMap.linkURL;
    this.imageURL = profileMap.imageURL;
    this.userID = profileMap.userID;
    if (Platform.OS !== 'android') {
      this.email = profileMap.email;
    }
    this.name = profileMap.name;
    this.refreshDate = profileMap.refreshDate
      ? new Date(profileMap.refreshDate)
      : null;
    this.friendIDs = profileMap.friendIDs;
    this.birthday = profileMap.birthday ? new Date(profileMap.birthday) : null;
    this.ageRange = profileMap.ageRange;
    this.hometown = profileMap.hometown;
    this.location = profileMap.location;
    this.gender = profileMap.gender;
    this.permissions = profileMap.permissions;
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
