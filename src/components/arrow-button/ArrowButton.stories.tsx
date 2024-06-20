import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	tags: ['autodics'],
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	name: 'close form',
	render: () => {
		return (
			<>
				<ArrowButton
					isOpen={false}
					OnClick={() => console.log('настройки закрыты')}
				/>
			</>
		);
	},
};

export const ArrowButtonOpenStory: Story = {
	name: 'open form',
	render: () => {
		return (
			<>
				<ArrowButton
					isOpen={true}
					OnClick={() => console.log('настройки открыты')}
				/>
			</>
		);
	},
};
