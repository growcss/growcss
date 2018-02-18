import initStoryshots, { getSnapshotFileName } from '@storybook/addon-storyshots';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

initStoryshots({
  test: ({ story, context }) => {
    const snapshotFileName = getSnapshotFileName(context);
    const storyElement = story.render(context);
    const shallowTree = shallow(storyElement);

    if (snapshotFileName) {
      expect(toJson(shallowTree)).toMatchSpecificSnapshot(snapshotFileName);
    }
  }
});
