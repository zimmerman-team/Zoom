import React from 'react';
import DownloadTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/DownloadTab';
import DuplicatorTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/DuplicatorTab';
import VisibilityTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/VisibilityTab';

import IconFilter from 'assets/icons/toolpanel/IconFilter';
import IconContext from 'assets/icons/toolpanel/IconContext';
import IconPreview from 'assets/icons/toolpanel/IconPreview';
import IconDownload from 'assets/icons/toolpanel/IconDownload';
import IconDuplicate from 'assets/icons/toolpanel/IconDuplicate';
import IconVisibility from 'assets/icons/toolpanel/IconVisibility';
import ContextEditor from 'components/chartcontext/ContextEditor/ContextEditor';
import VizPaneMediator from 'mediators/ComponentMediators/PaneMediators/VisPaneMediator/VizPaneMediator';

const Path = '/visualizer/:code/';

export const data = {
  sections: [
    {
      label: 'edit',
      path: Path + 'edit',
      component: VizPaneMediator,
      icon: <IconFilter />
    },
    {
      label: 'context',
      path: Path + 'context',
      component: ContextEditor,
      icon: <IconContext />
    },
    {
      label: 'preview',
      path: Path + 'preview',
      component: undefined,
      icon: <IconPreview />
    },
    {
      label: 'download',
      path: Path + 'download',
      component: DownloadTab,
      icon: <IconDownload />
    },
    {
      label: 'duplicate',
      path: Path + 'duplicate',
      component: DuplicatorTab,
      icon: <IconDuplicate />
    },
    {
      label: 'visibility',
      path: Path + 'visibility',
      component: VisibilityTab,
      icon: <IconVisibility />
    }
  ]
};

export default data;
