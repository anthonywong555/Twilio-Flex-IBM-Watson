import React from 'react';

const TaskBotParser = (props) => {
  const {task} = props;
  if(task.attributes.Bot) {
    return (
      <React.Fragment>
        <h1>Plugin-Task-Bot-Parser</h1>
        <h2>Current Intent:</h2>
        <br />
        {task.attributes.Bot.currentIntent}
        <br />
        <br />
        <h2>Context: </h2>
        <br />
        {task.attributes.Bot.context}
        <br />
        <br />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        Plugin-Task-Bot-Parser
      </React.Fragment>
    );
  }
};

export default TaskBotParser;
