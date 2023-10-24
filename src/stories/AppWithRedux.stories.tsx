import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import App from "../app/App";
import {ReduxStoreProviderDecoration} from "../state/ReduxStoreProviderDecoration";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof App> = {
  title: 'TODOLIST/AppWithRedux',
  component: App,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecoration]

};

export default meta;
type Story = StoryObj<typeof App>;


// export const AppWithReduxStory: Story = {
//   render: ()=> <App/>
// }



export const AppBaseExample = (props: any) =>{
  return (<App demo={true}/>)
}

