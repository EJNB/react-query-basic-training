import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces/issue";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";
import { IssueComment } from "../components/IssueComment";

export const getInfoIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

export const getInfoComments = async (
  issueNumber: number
): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getInfoIssue(issueNumber)
  );

  const commetsQuery = useQuery(
    ["issue", issueNumber, "comments"],
    () => getInfoComments(issueQuery.data!.number),
    { enabled: issueQuery.data !== undefined }
  );

  return { issueQuery, commetsQuery };
};
