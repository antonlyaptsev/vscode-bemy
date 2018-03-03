import { WorkspaceConfiguration } from 'vscode';

export interface Config extends WorkspaceConfiguration {
    addToGit: boolean;
    deepRename: boolean;
    configPath: string;
}