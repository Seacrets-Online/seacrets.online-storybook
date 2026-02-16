import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import type { TabsProps } from '@mui/material/Tabs';

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
