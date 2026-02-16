import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';
import type { TabsProps } from '@mui/material';

export interface TabItem {
  label: string;
  value: number | string;
}

export type TabInput = TabItem | string;

export interface TabsPropsExtended extends Omit<TabsProps, 'children'> {
  tabs?: TabInput[];
}

export const Tabs = ({
  value,
  onChange,
  tabs = [],
  ...props
}: TabsPropsExtended) => (
  <MuiTabs value={value} onChange={onChange} {...props}>
    {tabs.map((tab, i) => {
      const t = typeof tab === 'object' ? tab : { label: tab, value: i };
      return <MuiTab key={String(t.value ?? i)} label={t.label} value={t.value ?? i} />;
    })}
  </MuiTabs>
);

export default Tabs;
