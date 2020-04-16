import React from 'react';
import { shallow } from 'enzyme';
import TreeMapHtmlNode from 'app/components/charts/treemap/TreeMapHtmlNode/TreeMapHtmlNode';
// Components
import {
  NodeLabel,
  NodeValue,
  TextContainer,
  TreeNodeBase
} from 'app/components/charts/treemap/TreeMapHtmlNode/TreeMapHtmlNode.styles';
import { treeMapNodeMockData } from 'app/__mocks__/treeMapMock';

const wrapper = shallow(
  <TreeMapHtmlNode
    node={treeMapNodeMockData.node}
    style={treeMapNodeMockData.style}
  />
);

describe('<TreeMapHtmlNode />', () => {
  it('renders one <TextContainer/> component', () => {
    expect(wrapper.find(TextContainer)).toHaveLength(1);
  });
  it('renders one <NodeLabel/> component', () => {
    expect(wrapper.find(NodeLabel)).toHaveLength(1);
  });
  it('renders one <NodeValue/> component', () => {
    expect(wrapper.find(NodeValue)).toHaveLength(1);
  });
  it('renders one <TreeNodeBase/> component', () => {
    expect(wrapper.find(TreeNodeBase)).toHaveLength(1);
  });
});
