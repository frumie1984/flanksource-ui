import React from "react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { EvidenceSection } from "../EvidenceSection";
import { useUser } from "../../../context";
import { Dropdown } from "../../Dropdown";
import { createComment } from "../../../api/services/comments";
import { hypothesisStatusDropdownOptions } from "../../../constants/hypothesisStatusOptions";
import { HypothesisStatus } from "../../../api/services/hypothesis";
import { Modal } from "../../Modal";
import { toastError } from "../../Toast/toast";

const nextNodePath = {
  default: "root",
  root: "factor",
  factor: "solution"
};

interface IProps {
  node: any;
  api: { [k: string]: any };
  onHypothesisCreated: () => void;
  isOpen: boolean;
}

export const CreateHypothesis = ({
  node,
  api,
  onHypothesisCreated,
  isOpen
}: IProps) => {
  const { user } = useUser();
  const { control, getValues, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      hypothesis: {
        status: HypothesisStatus.Possible,
        title: ""
      },
      evidence: {},
      comment: {
        text: ""
      }
    }
  });
  const evidenceValue = watch("evidence");
  const handleComment = (nodeId: string, value: string) =>
    createComment({
      user,
      incidentId: node.incident_id,
      hypothesisId: nodeId,
      comment: value
    })
      .then((response) => console.log(response))
      .catch(toastError);

  const onSubmit = async () => {
    const newNodeID = uuidv4();
    if (api?.createMutation) {
      // try {
      // eslint-disable-next-line no-unused-vars
      const newNodeResponse = await api.createMutation.mutateAsync({
        user,
        id: newNodeID,
        incidentId: api.incidentId,
        params: {
          parent_id: node?.id,
          title: getValues("hypothesis.title"),
          type: nextNodePath[node?.type || "default"],
          status: getValues("hypothesis.status")
        }
      });
      const newNode = newNodeResponse.data[0];
      if (getValues("comment.text")) {
        await handleComment(newNode.id, getValues("comment.text"));
      }
    }
    onHypothesisCreated();
  };
  return (
    <Modal
      open={isOpen}
      onClose={onHypothesisCreated}
      wrapWith={({ children }) => (
        <form onSubmit={(...args) => handleSubmit(onSubmit)(...args)}>
          {children}
        </form>
      )}
      title={
        <Controller
          name="hypothesis.title"
          control={control}
          render={({ field }) => (
            <input
              className="w-72 cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-500 text-base leading-6 font-normal"
              type="text"
              placeholder="Type name"
              {...field}
            />
          )}
        />
      }
      size="medium"
    >
      <div className="mt-4">
        <Dropdown
          control={control}
          name="hypothesis.status"
          className="mb-4 w-72"
          items={hypothesisStatusDropdownOptions}
          label="State"
        />
      </div>
      <EvidenceSection
        hypothesis={node}
        evidence={evidenceValue}
        titlePrepend={
          <div className="mr-2 text-sm font-medium text-gray-700 mt-1.5">
            Evidence
          </div>
        }
        onButtonClick={(data) => {
          setValue("evidence", data);
        }}
      />
      <div>
        <h3 className="mt-4 text-sm font-medium text-gray-700 mb-1.5">
          Comment
        </h3>
        <Controller
          name="comment.text"
          control={control}
          render={({ field }) => (
            <textarea
              className="w-full border-gray-200 resize-none rounded-6px text-base leading-6 font-normal font-inter outline-none placeholder-gray-400"
              placeholder="Type something"
              style={{ minHeight: "138px" }}
              {...field}
            />
          )}
        />
      </div>
      <div className="flex justify-end mt-4">
        <input
          type="submit"
          className="bg-dark-blue text-white rounded-6px py-3.5 px-6 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={false}
          value="Create"
        />
      </div>
    </Modal>
  );
};
