export interface IssuesSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Item[];
}

    export interface User {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    }

    export interface PullRequest {
        url: string;
        html_url: string;
        diff_url: string;
        patch_url: string;
    }

    export interface Item {
        url: string;
        repository_url: string;
        labels_url: string;
        comments_url: string;
        events_url: string;
        html_url: string;
        id: number;
        node_id: string;
        number: number;
        title: string;
        user: User;
        labels: any[];
        state: string;
        locked: boolean;
        assignee?: any;
        assignees: any[];
        milestone?: any;
        comments: number;
        created_at: Date;
        updated_at: Date;
        closed_at: Date;
        author_association: string;
        active_lock_reason?: any;
        draft: boolean;
        pull_request: PullRequest;
        body: string;
        performed_via_github_app?: any;
        score: number;
    }

