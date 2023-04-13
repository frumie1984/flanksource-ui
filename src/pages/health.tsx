import { useContext, useState } from "react";
import { SearchLayout } from "../components/Layout";
import { Canary } from "../components/Canary";
import RefreshDropdown, {
  HEALTH_PAGE_REFRESH_RATE_KEY
} from "../components/RefreshDropdown";
import { HealthRefreshDropdownRateContext } from "../components/RefreshDropdown/RefreshRateContext";
import { Modal } from "../components";
import { SchemaResourceI, createResource } from "../api/schemaResources";
import { AuthContext } from "../context";
import { schemaResourceTypes } from "../components/SchemaResourcePage/resourceTypes";
import { AiFillPlusCircle } from "react-icons/ai";
import { BreadcrumbNav, BreadcrumbRoot } from "../components/BreadcrumbNav";
import { Head } from "../components/Head/Head";
import HealthSpecEditor from "../components/SpecEditor/HealthSpecEditor";

type Props = {
  url: string;
};

export function HealthPage({ url }: Props) {
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const resourceInfo = schemaResourceTypes.find(
    (item) => item.name === "Health Check"
  );

  /**
   * Refresh page whenever clicked, increment state to trigger useEffect
   */
  const [triggerRefresh, setTriggerRefresh] = useState(0);
  const [refreshRate, setRefreshRate] = useState(() => {
    const refreshRate = localStorage.getItem(HEALTH_PAGE_REFRESH_RATE_KEY);
    return refreshRate ?? "";
  });

  const onSubmit = async (data: Partial<SchemaResourceI>) => {
    await createResource(resourceInfo, {
      ...data,
      created_by: user?.id
    });
    // todo: wire up to refresh
    // setReload((x) => x + 1);
    setModalIsOpen(false);
  };

  return (
    <>
      <Head prefix="Health" />
      <HealthRefreshDropdownRateContext.Provider
        value={{
          refreshRate,
          setRefreshRate
        }}
      >
        <SearchLayout
          title={
            <BreadcrumbNav
              list={[
                <BreadcrumbRoot link="/health">Health</BreadcrumbRoot>,
                <button
                  type="button"
                  className=""
                  onClick={() => setModalIsOpen(true)}
                >
                  <AiFillPlusCircle size={32} className="text-blue-600" />
                </button>
              ]}
            />
          }
          extra={
            <RefreshDropdown
              onClick={() => setTriggerRefresh(triggerRefresh + 1)}
              isLoading={loading}
            />
          }
          contentClass="p-0"
        >
          <Canary
            url={url}
            onLoading={setLoading}
            triggerRefresh={triggerRefresh}
          />
        </SearchLayout>
        <Modal
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          bodyClass=""
          size="full"
          title={`Add ${resourceInfo!.name}`}
        >
          <HealthSpecEditor onSubmit={(val) => onSubmit(val)} canEdit />
        </Modal>
      </HealthRefreshDropdownRateContext.Provider>
    </>
  );
}
