import { githubApi } from "../../api/githubApi";
import { Issue, Label, State } from "../interfaces";
import { useQuery } from "@tanstack/react-query";
import { sleep } from "../../helpers/sleep";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
  sleep(2);

  const params = new URLSearchParams();
  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelString = labels.join(","); // label 1, label 2, label 3
    params.append("labels", labelString);
  }

  params.append("page", "1");
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssues = ({ state, labels }: Props) => {
  const issuesQuery = useQuery(["issues", { state, labels }], () =>
    getIssues(labels, state)
  );
  return { issuesQuery };
};
