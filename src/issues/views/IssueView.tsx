import { Link, Navigate, useParams } from "react-router-dom";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";

export const IssueView = () => {
  const { id = "0" } = useParams();
  const { issueQuery, commetsQuery } = useIssue(+id);

  if (issueQuery.isLoading) return <LoadingIcon />;
  if (!issueQuery.data) return <Navigate to="/issues/list" />;

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="./issues/list">Go Back</Link>
      </div>

      <IssueComment issue={issueQuery.data} />

      {commetsQuery.isLoading && <LoadingIcon />}
      {commetsQuery.data?.map((issue) => (
        <IssueComment key={issue.id} issue={issue} />
      ))}
    </div>
  );
};
