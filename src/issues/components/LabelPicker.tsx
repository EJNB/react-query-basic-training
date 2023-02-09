import { useLabels } from "../hooks/useLabels";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { FC } from "react";
import { Label } from "../interfaces/label";

interface Props {
  selectedLabels: string[];
  onChangeSelectedLabel: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({
  selectedLabels,
  onChangeSelectedLabel,
}) => {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return <LoadingIcon />;

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) ? "label-active" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `${label.color}`,
          }}
          onClick={() => onChangeSelectedLabel(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
