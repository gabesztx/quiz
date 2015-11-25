'use strict';
class PostalService {
  /**
   * @returns set postal bust channel name
   */
  setChannel(channelName) {
    this._channel = postal.channel(channelName);
  }
  /**
   * @returns subscribe postal channel
   */
  channelSubscribe(channelName, callback) {
    this._subscriptionDefinition = this._channel.subscribe(channelName, callback);
    return this;
  }
  /**
   * @returns publish postal data
   */
  publish(cname, data) {
    this._channel.publish(cname, data);
  }
}
export default PostalService