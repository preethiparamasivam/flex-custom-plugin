import React from 'react';
import { Actions } from "@twilio/flex-ui";
import { FlexPlugin } from '@twilio/flex-plugin';

//import CustomTaskList from './components/CustomTaskList/CustomTaskList';

const PLUGIN_NAME = 'SampleMusicPlugin';

export default class SampleMusicPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
     //bing search
     flex.CRMContainer.defaultProps.uriCallback = (task) => {
      return task
        ? `https://www.bing.com/search?q=${task.attributes.caller_city ? task.attributes.caller_city+' weather' : ''}`
        : "https://www.bing.com"
    };

    Actions.replaceAction("HoldCall", (payload, original) => {
      return new Promise((resolve, reject) => {
      resolve();
             }).then(() => {
      original({
                 ...payload,
      holdMusicUrl: "https://lion-pike-6103.twil.io/assets/waiting-music-116216.mp3",
      holdMusicMethod: "GET",
               });
             });
           });

    Actions.addListener("beforeTransferTask", (payload) => {
      const { task } = payload;
      flex.Actions.invokeAction("HoldCall", { task: task, holdmusicURL: "https://lion-pike-6103.twil.io/assets/waiting-music-116216.mp3"});
      });
           
  }
}
