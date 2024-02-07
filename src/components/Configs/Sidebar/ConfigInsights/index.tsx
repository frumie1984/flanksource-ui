import { MdOutlineInsights } from "react-icons/md";
import { useGetConfigInsights } from "../../../../api/query-hooks";
import PillBadge from "../../../../ui/Badge/PillBadge";
import CollapsiblePanel from "../../../../ui/CollapsiblePanel/CollapsiblePanel";
import Title from "../../../Title/title";
import InsightsDetails from "../Insights/Insights";

type Props = {
  configID: string;
  isCollapsed?: boolean;
  onCollapsedStateChange?: (isClosed: boolean) => void;
};

export default function ConfigInsights({
  configID,
  isCollapsed = false,
  onCollapsedStateChange = () => {}
}: Props) {
  const { data: response } = useGetConfigInsights(configID, 0, 50);
  const count = response?.totalEntries ?? 0;

  return (
    <CollapsiblePanel
      isCollapsed={isCollapsed}
      onCollapsedStateChange={onCollapsedStateChange}
      Header={
        <div className="flex flex-row w-full items-center space-x-2">
          <Title
            title="Insights"
            icon={<MdOutlineInsights className="w-6 h-auto" />}
          />
          <PillBadge>{count}</PillBadge>
        </div>
      }
      dataCount={count}
    >
      <InsightsDetails type="configs" configId={configID} />
    </CollapsiblePanel>
  );
}
