import { IncidentCommander } from "../axios";
import { resolve } from "../resolve";
import { User } from "./users";

export enum EvidenceType {
  Log = "log",
  Config = "config",
  Topology = "topology"
}

interface EvidenceBase {
  user: User;
  id: string;
  hypothesisId: string;
  description: string;
  properties: string;
}

interface LogEvidence extends EvidenceBase {
  type: EvidenceType.Log;
  evidence: {
    lines: any[];
  };
}

interface ConfigEvidence extends EvidenceBase {
  type: EvidenceType.Config;
  evidence: {
    id: string;
    lines: string[];
    selected_lines: { [index: string]: string };
  };
}

interface TopologyEvidence extends EvidenceBase {
  type: EvidenceType.Topology;
  evidence: {
    id: string;
  };
}

export type Evidence = LogEvidence | ConfigEvidence | TopologyEvidence;

export const getAllEvidenceByHypothesis = async (hypothesisId: string) =>
  resolve(IncidentCommander.get(`/evidence?hypothesis_id=eq.${hypothesisId}`));

export const getEvidence = async (id: string) =>
  resolve(IncidentCommander.get(`/evidence?id=eq.${id}`));

export const createEvidence = async (args: Evidence) => {
  const { user, id, hypothesisId, evidence, type, description, properties } =
    args;

  return resolve(
    IncidentCommander.post(`/evidence`, {
      id,
      created_by: user.id,
      hypothesis_id: hypothesisId,
      evidence,
      type,
      description,
      properties
    })
  );
};

export const updateEvidence = async (id: string, params: {}) =>
  resolve(IncidentCommander.patch(`/evidence?id=eq.${id}`, { ...params }));

export const deleteEvidence = async (id: string) =>
  resolve(IncidentCommander.delete(`/evidence?id=eq.${id}`));

export const deleteEvidenceBulk = async (idList: string[]) => {
  let ids = "";
  idList.forEach((id, index) => {
    ids += `"${id}"`;
    if (index < idList.length - 1) {
      ids += ",";
    }
  });
  return resolve(IncidentCommander.delete(`/evidence?id=in.(${ids})`));
};
