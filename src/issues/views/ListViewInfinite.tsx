import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces";
import { useIssuesInfinite } from "../hooks";

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issueInfinitesQuery } = useIssuesInfinite({
    state,
    labels: selectedLabels,
  });

  const handleSelectedLabel = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issueInfinitesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issueInfinitesQuery.data?.pages.flat() || []}
            state={state}
            onStateChange={(newState) => {
              setState(newState);
            }}
          />
        )}
        <button
          className="btn btn-outline-primary mt-2"
          onClick={() => issueInfinitesQuery.fetchNextPage()}
          disabled={!issueInfinitesQuery.hasNextPage}
        >
          Load more...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChangeSelectedLabel={handleSelectedLabel}
        />
      </div>
    </div>
  );
};
