import React, { useEffect, useState } from "react";
import { Icon } from "../Icon";
import SpecEditorForm from "../Forms/SpecEditorForm";
import { SchemaResourceTypes } from "../SchemaResourcePage/resourceTypes";

export type SpecType = {
  name: string;
  icon: string;
  loadSpec: () => Record<string, any>;
  updateSpec: (spec: Record<string, any>) => void;
  configForm: React.FC<{ fieldName: string }> | null;
  /**
   *
   * the field name is the name of the field in the spec that this config editor
   * is editing (e.g. "kubernetes" or "kubernetes.0")
   *
   * #### Example
   *
   * if the spec is: `{ spec: { "kubernetes": { ... } }}` then the field name is `"spec.kubernetes"`
   * and, in this case, it returns an object
   *
   * if the spec is `{ spec: { kubernetes: [{ ... }] }}` then the field name is `"spec.kubernetes.0"`
   * and, in this case, it returns an array of one item
   *
   */
  formFieldName: string;
  rawSpecInput?: boolean;
};

type SpecEditorProps = {
  types: SpecType[];
  format?: "json" | "yaml";
  resourceName: SchemaResourceTypes[number]["name"];
  canEdit?: boolean;
  selectedSpec?: string;
  deleteHandler?: (id: string) => void;
};

export default function SpecEditor({
  types,
  format = "yaml",
  resourceName,
  canEdit = true,
  selectedSpec,
  deleteHandler
}: SpecEditorProps) {
  const [selectedSpecItem, setSelectedSpecItem] = useState<
    SpecType | undefined
  >(() => types.find(({ name }) => name === selectedSpec));

  // if the types change, we need to update the selectedSpecItem to the new
  // item, so that the form is updated, a good example is when we toggle canEdit
  useEffect(() => {
    if (selectedSpecItem) {
      setSelectedSpecItem(
        types.find(({ name }) => name === selectedSpecItem.name)
      );
    }
    // don't add selectedSpecItem to the dependency list, because we don't want
    // to initiate a race condition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types]);

  return (
    <div className="flex flex-col w-full flex-1 h-full overflow-y-auto">
      {selectedSpecItem ? (
        <div className="flex flex-col space-y-2">
          <SpecEditorForm
            canEdit={canEdit}
            configForm={selectedSpecItem.configForm}
            updateSpec={selectedSpecItem.updateSpec}
            loadSpec={selectedSpecItem.loadSpec}
            rawSpecInput={selectedSpecItem.rawSpecInput}
            specFormat={format}
            resourceName={resourceName}
            specFormFieldName={selectedSpecItem.formFieldName}
            deleteHandler={deleteHandler}
          />
        </div>
      ) : (
        <div className="flex flex-wrap p-2">
          {types.map((type) => (
            <div className="flex flex-col w-1/5 p-2">
              <div
                onClick={() => setSelectedSpecItem(type)}
                role={"button"}
                className="flex flex-col items-center space-y-2 justify-center p-2 border border-gray-700 hover:border-blue-200 hover:bg-gray-100 rounded-md text-center h-20 font-semibold"
                key={type.name}
              >
                <Icon name={type.icon} />
                <span>{type.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
