import initStoryshots, { Options, multiSnapshotWithOptions } from '@storybook/addon-storyshots';
import { createSerializer } from 'enzyme-to-json';

// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
const options = <Options>{
    mode: "deep"
};

initStoryshots({
    snapshotSerializers: [createSerializer(options)],
    integrityOptions: { cwd: __dirname },
    test: multiSnapshotWithOptions(),
});