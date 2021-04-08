type ActionType = // The user is sending an object to their friends.
'send' | 'askfor' | 'turn';
type Filters = // Friends using the app can be displayed.
'app_users' | 'app_non_users';
/**
 * A model for a game request.
 */
export type GameRequestContent = {
  /**
     * A plain-text message to be sent as part of the request.  Required.
     */
  message: string;
  /**
     * Used when defining additional context about the nature of the request.
     * The parameter 'objectID' is required if the action type is either 'send' or 'ask-for'.
     */
  actionType?: ActionType;
  /**
     * Additional freeform data you may pass for tracking. The maximum length is 255 characters.
     */
  data?: string;
  /**
     * Controls the set of friends someone sees if a multi-friend selector is shown.
     */
  filters?: Filters;
  /**
     * The Open Graph object ID of the object being sent/asked for. This cannot be null for ActionType SEND and ASKFOR.
     */
  objectId?: string;
  /**
     * An array of user IDs, usernames or invite tokens of people to send requests to.
     */
  recipients?: Array<string>;
  /**
     * An array of user IDs that will be included in the dialog as the first suggested friends.
     * Can't be used together with filters.
     */
  suggestions?: Array<string>;
  /**
     * The title for the dialog.
     */
  title?: string;
};
export {};
