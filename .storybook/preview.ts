import type { Preview } from '@storybook/web-components';

import '../src/index';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true
    }
  }
};

export default preview;
