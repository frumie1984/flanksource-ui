import { Tag } from "@flanksource-ui/ui/Tags/Tag";
import { CellContext } from "@tanstack/react-table";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ConfigItem } from "../../../../api/types/configs";

type ConfigListTagsCellProps<
  T extends {
    tags: Record<string, any>;
  }
> = Pick<CellContext<Pick<T, "tags">, any>, "getValue"> & {
  hideGroupByView?: boolean;
  label?: string;
  enableFilterByTag?: boolean;
};

export default function ConfigListTagsCell<
  T extends { tags: Record<string, any> }
>({
  getValue,
  hideGroupByView = false,
  enableFilterByTag = false
}: ConfigListTagsCellProps<T>): JSX.Element | null {
  const [params, setParams] = useSearchParams();

  const tagMap = getValue<ConfigItem["tags"]>() || {};
  const tagKeys = Object.keys(tagMap)
    .sort()
    .filter((key) => key !== "toString");

  const onFilterByTag = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement>,
      tag: {
        key: string;
        value: string;
      },
      action: "include" | "exclude"
    ) => {
      if (!enableFilterByTag) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Get the current tags from the URL
      const currentTags = params.get("tags");
      const currentTagsArray = currentTags ? currentTags.split(",") : [];

      // If include, remove all exclude values and vice versa
      const newValues = currentTagsArray.filter(
        (value) =>
          (action === "include" && parseInt(value.split(":")[1]) === 1) ||
          (action === "exclude" && parseInt(value.split(":")[1]) === -1)
      );

      // Append the new value
      const updatedValue = newValues
        .concat(`${tag.key}____${tag.value}:${action === "include" ? 1 : -1}`)
        .filter((value, index, self) => self.indexOf(value) === index)
        .join(",");

      // Update the URL
      params.set("tags", updatedValue);
      setParams(params);
    },
    [enableFilterByTag, params, setParams]
  );

  const groupByProp = decodeURIComponent(params.get("groupByProp") ?? "");

  if (tagKeys.length === 0) {
    return null;
  }

  if (!hideGroupByView && groupByProp) {
    if (!tagMap[groupByProp]) {
      return null;
    }

    return (
      <div className="flex w-full max-w-full flex-wrap space-y-1 pl-1 font-mono">
        <div
          className="mr-1 max-w-full overflow-hidden text-ellipsis rounded-md border border-gray-300 bg-gray-200 px-1 py-0.75 text-xs font-semibold text-gray-600"
          key={groupByProp}
        >
          {groupByProp}:{" "}
          <span className="font-light">{tagMap[groupByProp]}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {Object.entries(tagMap).map(([key, value]) => (
        <Tag
          tag={{
            key,
            value
          }}
          title={value}
          key={value}
          variant="gray"
          onFilterByTag={enableFilterByTag ? onFilterByTag : undefined}
        >
          {value}
        </Tag>
      ))}
    </div>
  );
}
