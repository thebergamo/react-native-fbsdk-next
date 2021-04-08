/**
 * Specifies the privacy of a group.
 */
type AppGroupPrivacy = // Anyone can see the group, who's in in and what members post.
'Open' | 'Closed';
/**
 * A model for app invites.
 */
export type AppGroupCreationContent = {
  /**
     * The description of the group.
     */
  description: string;
  /**
     * The name of the group.
     */
  name: string;
  /**
     * The privacy for the group.
     */
  privacy: AppGroupPrivacy;
};
export {};
