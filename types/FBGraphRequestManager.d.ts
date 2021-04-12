import type {
   FBGraphRequest,
} from './FBGraphRequest';

type Callback = (error?: any | null, result?: any | null) => void;
export class FBGraphRequestManager {
  requestBatch: Array<FBGraphRequest>;

  requestCallbacks: Array<Callback | undefined | null>;

  batchCallback: Callback;
  constructor();
  /**
     * Add a graph request.
     */
  addRequest(request: FBGraphRequest): FBGraphRequestManager;
  /**
     * Add call back to the GraphRequestManager. Only one callback can be added.
     * Note that invocation of the batch callback does not indicate success of every
     * graph request made, only that the entire batch has finished executing.
     */
  addBatchCallback(callback: (error?: any | null, result?: any | null) => void): FBGraphRequestManager;
  /**
     * Executes requests in a batch.
     * Note that when there's an issue with network connection the batch callback
     * behavior differs in Android and iOS.
     * On iOS, the batch callback returns an error if the batch fails with a network error.
     * On Android, the batch callback always returns {"result": "batch finished executing"}
     * after the batch time out. This is because detecting network status requires
     * extra permission and it's unncessary for the sdk. Instead, you can use the NetInfo module
     * in react-native to get the network status.
     */
  start(timeout?: number | null): void;
}
