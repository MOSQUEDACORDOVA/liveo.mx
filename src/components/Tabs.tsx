/* eslint-disable react-hooks/exhaustive-deps */
import { ITabNameNewWill } from "@/pages/dashboard/components/user_dashboard/NewWill";
import { ITabName } from "@/pages/services/subscription/SuscriptionPage";
import { Divider, Tab, Tabs as TabsMUI } from "@mui/material";
import { useEffect, useState } from "react";

type IProps = {
  tabs: { name: ITabName | ITabNameNewWill; disabled?: boolean }[];
  padding?: string;
  sticky?: boolean;
  handleActiveTab?: (tab: number) => void;
  divider?: boolean;
  value?: number;
};

export const Tabs = ({
  tabs,
  sticky,
  padding,
  handleActiveTab,
  divider,
  value,
}: IProps) => {
  const [valueData, setValue] = useState(0);
  const [dataTabs] = useState(tabs);

  useEffect(() => {
    if (value) {
      [...dataTabs, (dataTabs[value].disabled = false)] && setValue(value);
    }
  }, [value]);

  useEffect(() => handleActiveTab && handleActiveTab(valueData), [valueData]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    !tabs[valueData].disabled && setValue(newValue);
  };

  return (
    <div className={`${sticky && "sticky top-0 z-10"}`}>
      <div className={`flex bg-white rounded-t-md ${padding}`}>
        <TabsMUI
          className="text-light-violet font-bold"
          value={valueData}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#b08fde",
            },
          }}
        >
          {dataTabs.map((item: { name: string; disabled?: boolean }, index) => (
            <Tab
              onClick={() => !item.disabled && setValue(index)}
              disabled={item.disabled}
              sx={{
                "&.Mui-selected": {
                  color: "#b08fde",
                },
                "&.Mui-disabled": {
                  color: "#b7b7b740",
                },
                color: "#b7b7b7",
              }}
              key={index}
              label={item.name}
            />
          ))}
        </TabsMUI>
      </div>
      {divider && (
        <div className={`bg-white ${padding}`}>
          <Divider />
        </div>
      )}
    </div>
  );
};
