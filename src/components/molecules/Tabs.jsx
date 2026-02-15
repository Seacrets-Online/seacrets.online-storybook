import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';

/**
 * Tabs molecule - MUI Tabs.
 */
export const Tabs = ({
  value,
  onChange,
  tabs = [],
  ...props
}) => (
  <MuiTabs value={value} onChange={onChange} {...props}>
    {tabs.map((tab, i) => {
      const t = typeof tab === 'object' ? tab : { label: tab, value: i };
      return <MuiTab key={t.value ?? i} label={t.label} value={t.value ?? i} />;
    })}
  </MuiTabs>
);

export default Tabs;
