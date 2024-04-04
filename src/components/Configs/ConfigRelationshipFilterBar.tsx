import { ConfigRelationshipToggles } from "./Changes/ConfigsRelatedChanges/FilterBar/ConfigRelationshipToggles";
import { ConfigListToggledDeletedItems } from "./ConfigListToggledDeletedItems/ConfigListToggledDeletedItems";
import ConfigGraphTableToggle from "./ConfigsListFilters/ConfigGraphTableToggle";
import { ConfigLabelsDropdown } from "./ConfigsListFilters/ConfigLabelsDropdown";
import { ConfigTypesDropdown } from "./ConfigsListFilters/ConfigTypesDropdown";
import { ConfigTypesTriStateDropdown } from "./ConfigsListFilters/ConfigTypesTriStateDropdown";

type ConfigRelationshipFilterBarProps = {
  isGraphView: boolean;
};

export default function ConfigRelationshipFilterBar({
  isGraphView
}: ConfigRelationshipFilterBarProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      {isGraphView ? (
        <ConfigTypesTriStateDropdown paramKey="configTypes" label="Type:" />
      ) : (
        <ConfigTypesDropdown />
      )}
      <ConfigLabelsDropdown />
      <ConfigRelationshipToggles />
      <ConfigListToggledDeletedItems />
      <div className="flex-1" />
      <ConfigGraphTableToggle />
    </div>
  );
}
