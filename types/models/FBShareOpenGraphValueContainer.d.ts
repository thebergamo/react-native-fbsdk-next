import type {
  SharePhoto,
} from './FBSharePhoto';

type OpenGraphProperties = {
  [key: string]: OpenGraphValue;
};
type OpenGraphValue = {
  type: OpenGraphValueType;
  value: any;
};
type OpenGraphValueType = 'number' | 'open-graph-object' | 'photo' | 'string';
/**
 * Represents an interface for adding and retrieving values to open graph objects and actions.
 */
export class ShareOpenGraphValueContainer {
  _properties: OpenGraphProperties;
  constructor(properties?: OpenGraphProperties | null);
  /**
     * Sets a number for the specified key.
     */
  putNumber(key: string, number: number): void;
  /**
     * Sets an open graph object for the specified key.
     */
  putObject(key: string, object: ShareOpenGraphValueContainer): void;
  /**
     * Sets a photo for the specified key.
     */
  putPhoto(key: string, photo: SharePhoto): void;
  /**
     * Sets a string for the specified key.
     */
  putString(key: string, string: string): void;
  /**
     * Gets an entry for the given key.
     */
  getEntry(key: string): OpenGraphValue;
}
