import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { fetchPullRequests } from '../services/githubService';
import './PullRequestList.css';

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
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const prData = fetchPullRequests();
        prData
            .then((data) => {
                const filteredRequiredData = data.map((pr: any) => {
                    return {
                        id: pr.id,
                        title: pr.title,
                        labels: pr.labels || [],
                        created_at: pr.created_at,
                        html_url: pr.html_url
                    }
                });
                setPullRequests(filteredRequiredData);
            })
            .catch((err) => {
                setError('Error fetching pull requests');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ alignSelf: 'center' }}>Pull Requests List</h2>
            <input
            type="text"
            placeholder="Filter by label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
            />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DataGrid style={{ 
                    flex: 1, 
                }} 
                slotProps={{
                    columnHeaders: {
                        style: {
                            backgroundColor: '#f0f0f0'
                        }
                    }
                }}
                rows={filter
                ? pullRequests.filter(pr => pr.labels.some(label => label.name.includes(filter)))
                : pullRequests}
                columns={[
                { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'header-bold' },
                { field: 'title', headerName: 'Title', flex: 2, headerClassName: 'header-bold' },
                { field: 'labels', headerName: 'Labels', flex: 1, headerClassName: 'header-bold', renderCell: (params) => params.value.map((label: any) => label.name).join(', ') },
                { field: 'created_at', headerName: 'Date Opened', flex: 1, headerClassName: 'header-bold' },
                { field: 'html_url', headerName: 'Link', flex: 1, headerClassName: 'header-bold', renderCell: (params) => <a href={params.value} target="_blank" rel="noopener noreferrer">View</a> }
                ]}
                pagination
                pageSizeOptions={[pullRequests.length]}
                autoHeight
            />
            </div>
        </div>
    );
};

export default PullRequestList;