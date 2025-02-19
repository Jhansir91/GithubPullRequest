import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchPullRequests } from "../services/githubService";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Chip,
} from "@mui/material";
import "./PullRequestList.css";

interface PullRequest {
  id: number;
  title: string;
  labels: { name: string }[];
  created_at: string;
  html_url: string;
}

const PullRequestList: React.FC = () => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [allLabels, setAllLabels] = useState<string[]>([]);

  useEffect(() => {
    fetchPullRequests()
      .then((data) => {
        const formattedData = data.map((pr: PullRequest) => ({
          id: pr.id,
          title: pr.title,
          labels: pr.labels || [],
          created_at: pr.created_at,
          html_url: pr.html_url,
        }));

        setPullRequests(formattedData);

        const labelsSet = new Set<string>();
        formattedData.forEach((pr: PullRequest) => {
          pr.labels.forEach((label: { name: string }) =>
            labelsSet.add(label.name)
          );
        });
        setAllLabels(Array.from(labelsSet));
      })
      .catch(() => setError("Error fetching pull requests"))
      .finally(() => setLoading(false));
  }, []);

  const handleLabelChange = (event: any) => {
    setSelectedLabels(event.target.value);
  };

  const filteredPullRequests = selectedLabels.length
    ? pullRequests.filter((pr) =>
        pr.labels.some((label) => selectedLabels.includes(label.name))
      )
    : pullRequests;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h2 style={{ alignSelf: "center" }}>Pull Requests List</h2>
      <FormControl style={{ marginBottom: "20px", width: "300px" }}>
        <InputLabel>Select Labels</InputLabel>
        <Select
          multiple
          value={selectedLabels}
          onChange={handleLabelChange}
          input={<OutlinedInput label="Select Labels" />}
          renderValue={(selected) => (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} style={{ margin: 2 }} />
              ))}
            </div>
          )}
        >
          {allLabels.map((label) => (
            <MenuItem key={label} value={label}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <DataGrid
          style={{
            flex: 1,
          }}
          slotProps={{
            columnHeaders: {
              style: {
                backgroundColor: "#f0f0f0",
              },
            },
          }}
          rows={filteredPullRequests}
          columns={[
            {
              field: "id",
              headerName: "ID",
              flex: 1,
              headerClassName: "header-bold",
            },
            {
              field: "title",
              headerName: "Title",
              flex: 2,
              headerClassName: "header-bold",
            },
            {
              field: "labels",
              headerName: "Labels",
              flex: 1,
              headerClassName: "header-bold",
              renderCell: (params) =>
                params.value.map((label: any) => label.name).join(", "),
            },
            {
              field: "created_at",
              headerName: "Date Opened",
              flex: 1,
              headerClassName: "header-bold",
            },
            {
              field: "html_url",
              headerName: "Link",
              flex: 1,
              headerClassName: "header-bold",
              renderCell: (params) => (
                <a
                  href={params.value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              ),
            },
          ]}
          pagination
          pageSizeOptions={[filteredPullRequests.length]}
          autoHeight
        />
      </div>
    </div>
  );
};

export default PullRequestList;
