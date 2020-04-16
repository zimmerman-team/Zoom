import React from 'react';
import DownloadTab from 'app/modules/visualizer/sort/sidebar/tabs/TabContent/sort/DownloadTab';
import VisibilityTab from 'app/modules/visualizer/sort/sidebar/tabs/TabContent/sort/VisibilityTab';

import IconFilter from 'app/assets/icons/toolpanel/IconFilter';
import IconContext from 'app/assets/icons/toolpanel/IconContext';
import IconPreview from 'app/assets/icons/toolpanel/IconPreview';
import IconDownload from 'app/assets/icons/toolpanel/IconDownload';
import IconDuplicate from 'app/assets/icons/toolpanel/IconDuplicate';
import IconVisibility from 'app/assets/icons/toolpanel/IconVisibility';
import ContextEditor from 'app/components/ContextEditor/ContextEditor';
import VizPaneMediator from 'app/mediators/ComponentMediators/PaneMediators/VisPaneMediator/VizPaneMediator';
import DuplicatorMediator from 'app/mediators/ComponentMediators/PaneMediators/DuplicatorMediator/DuplicatorMediator';

const Path = '/visualizer/:chart/:code/';

export const data = {
  sections: [
    {
      label: 'edit',
      path: `${Path}edit`,
      component: VizPaneMediator,
      icon: <IconFilter />
    },
    {
      label: 'context',
      path: `${Path}context`,
      component: ContextEditor,
      icon: <IconContext />
    },
    {
      label: 'preview',
      path: `${Path}preview`,
      component: undefined,
      icon: <IconPreview />
    },
    {
      label: 'download',
      path: `${Path}download`,
      component: DownloadTab,
      icon: <IconDownload />
    },
    {
      label: 'duplicate',
      path: `${Path}duplicate`,
      component: DuplicatorMediator,
      icon: <IconDuplicate />
    },
    {
      label: 'visibility',
      path: `${Path}visibility`,
      component: VisibilityTab,
      icon: <IconVisibility />
    }
  ]
};

export default data;
