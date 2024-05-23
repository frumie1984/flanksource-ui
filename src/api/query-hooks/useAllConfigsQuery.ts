import { useHideDeletedConfigs } from "@flanksource-ui/components/Configs/ConfigListToggledDeletedItems/ConfigListToggledDeletedItems";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { defaultStaleTime, prepareConfigListQuery } from ".";
import { getAllConfigsMatchingQuery } from "../services/configs";

export const useAllConfigsQuery = ({
  enabled = true,
  staleTime = defaultStaleTime,
  ...rest
}) => {
  const [searchParams] = useSearchParams({
    sortBy: "type",
    sortOrder: "asc",
    groupBy: "type"
  });

  const hideDeletedConfigs = useHideDeletedConfigs();
  const search = searchParams.get("search") ?? undefined;
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  const configType = searchParams.get("configType") ?? undefined;
  const labels = searchParams.get("labels") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const health = searchParams.get("health") ?? undefined;

  const query = useMemo(
    () =>
      prepareConfigListQuery({
        search,
        configType,
        sortBy,
        sortOrder,
        hideDeletedConfigs,
        includeAgents: true,
        labels: labels,
        health,
        status
      }),
    [
      search,
      configType,
      sortBy,
      sortOrder,
      hideDeletedConfigs,
      labels,
      health,
      status
    ]
  );

  return useQuery(
    [
      "allConfigs",
      search,
      configType,
      sortBy,
      sortOrder,
      hideDeletedConfigs,
      true,
      labels,
      health,
      status
    ],
    () => {
      return getAllConfigsMatchingQuery(query);
    },
    {
      staleTime,
      enabled,
      ...rest
    }
  );
};
