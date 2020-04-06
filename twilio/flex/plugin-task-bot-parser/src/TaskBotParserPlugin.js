import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import TaskBotParser from './components/TaskBotParser/TaskBotParser';

const PLUGIN_NAME = 'TaskBotParserPlugin';

export default class TaskBotParserPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.TaskInfoPanel.Content.add(
      <TaskBotParser key="TaskBotParser"/>, {
        sortOrder: -1
      }
    );
  }
}
