import { WorkspaceConfiguration } from 'vscode';

export interface CreateConfig extends WorkspaceConfiguration {
    addToGit: boolean
};